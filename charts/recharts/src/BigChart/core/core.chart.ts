import BigChart from '../BigChart'
import { RenderXAxisOptions } from '../types/render.type'
import { getFloor } from '../utils/number'
import { drawLine } from './core.canvas'

export class ChartRenderer {
  chart: BigChart

  constructor(chart: BigChart) {
    this.chart = chart
  }

  renderXAxis(options?: RenderXAxisOptions) {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const { width, height, axisBaseStartX, axisBaseEndY, axisBaseStrokeStyle } = chart.meta.data

    const xAxisPos = [
      [width * axisBaseStartX, height * axisBaseEndY],
      [width, height * axisBaseEndY],
    ]
    const xAxisStartPos = xAxisPos[0]
    const xAxisEndPos = xAxisPos[1]

    drawLine(ctx, xAxisStartPos[0], xAxisStartPos[1], xAxisEndPos[0], xAxisEndPos[1], {
      strokeStyle: axisBaseStrokeStyle,
    })

    if (options?.showLabel) {
      const labels = chart.config.data.labels
      const columnGridCounts = labels.length
      const startXWidth = width * axisBaseStartX
      const columnWidth = getFloor((width - startXWidth) / columnGridCounts) as number

      for (let i = 0; i < columnGridCounts; i++) {
        const label = `${Number(labels[i]) + 1}`
        const textString = ctx.measureText(label).width
        const startX =
          startXWidth +
          columnWidth * i +
          (getFloor(columnWidth / 2) as number) -
          (getFloor(textString / 2) as number)

        ctx.fillText(label, startX, height)
      }
    }
  }

  renderYAxis() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const { width, height, axisBaseStartX, axisBaseEndY, axisBaseStrokeStyle } = chart.meta.data

    const yAxisPos = [
      [width * axisBaseStartX, height * 0],
      [width * axisBaseStartX, height * axisBaseEndY],
    ]
    const yAxisStartPos = yAxisPos[0]
    const yAxisEndPos = yAxisPos[1]

    drawLine(ctx, yAxisStartPos[0], yAxisStartPos[1], yAxisEndPos[0], yAxisEndPos[1], {
      fillStyle: axisBaseStrokeStyle,
    })
  }

  renderGrid() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const { width, height, axisBaseStartX, axisBaseStrokeStyle } = chart.meta.data
    const columnGridCounts = chart.config.data.labels.length
    const startXWidth = width * axisBaseStartX
    const columnWidth = getFloor((width - startXWidth) / columnGridCounts) as number

    for (let i = 0; i < columnGridCounts; i++) {
      const startX = startXWidth + columnWidth * i

      drawLine(ctx, startX, 0, startX, height, {
        fillStyle: axisBaseStrokeStyle,
      })
    }
  }

  renderChart() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }
    const type = chart.config.type
    const Controller = chart.controller[type]

    const chartController = new Controller(chart)
    chartController.render()
  }
}
