import BigChart from '../BigChart'
import { getFloor } from '../utils/number'

export class BarController {
  chart: BigChart

  constructor(chart: BigChart) {
    this.chart = chart
  }

  render() {
    const chart = this.chart
    if (!chart.ctx || !chart.meta || !chart.config) {
      return
    }

    const ctx = chart.ctx
    const { datasets } = chart.config.data
    const { width, height, axisBaseStartX, axisBaseStartY } = chart.meta.data
    const columnGridCounts = chart.config.data.labels.length
    const startXWidth = width * axisBaseStartX
    const columnWidth = getFloor((width - startXWidth) / columnGridCounts) as number

    const values = datasets[0].data
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const ratio = maxValue - minValue

    for (let i = 0; i < columnGridCounts; i++) {
      const startX = startXWidth + columnWidth * i
      const heightAmount = values[i] / ratio
      const rectWidth = Math.floor(columnWidth * 0.6)
      const rectHeight = Math.floor(height * heightAmount)

      console.log(height * axisBaseStartY)
      ctx.fillRect(startX, height * axisBaseStartY, rectWidth, rectHeight)
    }
  }
}
