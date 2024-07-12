import BigChart from '../BigChart'
import { RenderXAxisOptions } from '../types/render.type'
import { getFontMeasure } from '../utils/canvas'
import { getFloor } from '../utils/number'
import { drawLine } from './core.canvas'

function roundUpToNearestUnit(value: number) {
  // Define the possible units we want to round up to
  const units = [1, 2, 5, 10]

  // Find the appropriate unit
  let selectedUnit = units[units.length - 1] // Default to the largest unit
  for (let unit of units) {
    if (value <= unit) {
      selectedUnit = unit
      break
    }
  }

  // Round up to the nearest selected unit
  return Math.ceil(value / selectedUnit) * selectedUnit
}

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
    const { axisBaseStartWidthX, axisBaseEndWidthX, axisBaseEndHeightY, axisBaseStrokeStyle } =
      chart.meta.data

    const xAxisPos = [
      [axisBaseStartWidthX, axisBaseEndHeightY],
      [axisBaseEndWidthX, axisBaseEndHeightY],
    ]
    const xAxisStartPos = xAxisPos[0]
    const xAxisEndPos = xAxisPos[1]

    drawLine(ctx, xAxisStartPos[0], xAxisStartPos[1], xAxisEndPos[0], xAxisEndPos[1], {
      strokeStyle: axisBaseStrokeStyle,
    })

    if (options?.showLabel) {
      const labels = chart.config.data.labels
      const columnGridCounts = labels.length
      const columnWidth = getFloor(
        (axisBaseEndWidthX - axisBaseStartWidthX) / columnGridCounts,
      ) as number

      for (let i = 0; i < columnGridCounts; i++) {
        const label = `${Number(labels[i]) + 1}`
        const { fontWidth, fontHeight } = getFontMeasure(ctx.measureText(label))

        const xPos =
          axisBaseStartWidthX +
          columnWidth * i +
          (getFloor(columnWidth / 2) as number) -
          (getFloor(fontWidth / 2) as number)
        const yPos = axisBaseEndHeightY + fontHeight * 1.25

        ctx.fillText(label, xPos, yPos)
      }
    }
  }

  renderYAxis(options?: RenderXAxisOptions) {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const {
      axisBaseStartX,
      axisBaseEndWidthX,
      axisBaseStartWidthX,
      axisBaseStartHeightY,
      axisBaseEndHeightY,
      axisBaseStrokeStyle,
      axisHeightAmount,
    } = chart.meta.data

    const yAxisPos = [
      [axisBaseStartWidthX, axisBaseStartHeightY],
      [axisBaseStartWidthX, axisBaseEndHeightY],
    ]
    const yAxisStartPos = yAxisPos[0]
    const yAxisEndPos = yAxisPos[1]

    drawLine(ctx, yAxisStartPos[0], yAxisStartPos[1], yAxisEndPos[0], yAxisEndPos[1], {
      fillStyle: axisBaseStrokeStyle,
    })

    if (options?.showLabel) {
      const datasets = chart.config.data.datasets
      const values = datasets[0].data

      const maxValue = Math.max(...values)
      const divide = 10
      const units = Math.ceil(Math.floor(maxValue / divide))

      for (let i = 0; i <= divide; i++) {
        const label = `${Number(units * (divide - i))}`
        const { fontWidth, fontHeight } = getFontMeasure(ctx.measureText(label))

        const baseYPos = axisBaseStartHeightY + axisHeightAmount / (divide / i)
        const textXPos = axisBaseEndWidthX * (axisBaseStartX / 1.35) - fontWidth
        const textYPos = baseYPos + fontHeight / 2.5

        ctx.fillText(label, textXPos, textYPos)

        const xAmount = axisBaseStartWidthX * 0.1
        const lineXPos = axisBaseStartWidthX - xAmount
        const lineXPosEnd = axisBaseStartWidthX + xAmount
        const lineYPos = baseYPos
        drawLine(ctx, lineXPos, lineYPos, lineXPosEnd, lineYPos, {
          strokeStyle: axisBaseStrokeStyle,
        })
      }
    }
  }

  renderGrid() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const {
      axisBaseStartWidthX,
      axisBaseEndWidthX,
      axisBaseStartHeightY,
      axisBaseEndHeightY,
      axisBaseStrokeStyle,
    } = chart.meta.data
    const columnGridCounts = chart.config.data.labels.length
    const columnWidth = (axisBaseEndWidthX - axisBaseStartWidthX) / columnGridCounts

    for (let i = 1; i <= columnGridCounts; i++) {
      const xPos = axisBaseStartWidthX + columnWidth * i

      drawLine(ctx, xPos, axisBaseStartHeightY, xPos, axisBaseEndHeightY, {
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
