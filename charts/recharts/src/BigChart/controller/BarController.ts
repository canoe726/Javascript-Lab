import BigChart from '../BigChart'
import { getRandomRgbColor } from '../utils/string'

export class BarController {
  chart: BigChart

  constructor(chart: BigChart) {
    this.chart = chart
  }

  render() {
    this.renderBar()
  }

  renderBar() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const { datasets } = chart.config.data
    const { axisBaseStartWidthX, axisBaseEndWidthX, axisBaseEndHeightY, axisHeightAmount } =
      chart.meta.data

    const columnGridCounts = chart.config.data.labels.length
    const columnWidth = (axisBaseEndWidthX - axisBaseStartWidthX) / columnGridCounts
    const values = datasets[0].data
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const valueDiff = maxValue - minValue

    for (let i = 0; i < columnGridCounts; i++) {
      const heightAmount = values[i] / valueDiff
      const rectWidth = columnWidth * 0.5
      const rectHeight = axisHeightAmount * heightAmount
      const xPos = axisBaseStartWidthX + columnWidth * i + (columnWidth - rectWidth) / 2
      const yPos = axisBaseEndHeightY * (1 - rectHeight / axisBaseEndHeightY)

      ctx.fillStyle = getRandomRgbColor()
      ctx.fillRect(xPos, yPos, rectWidth, rectHeight)
    }
  }
}
