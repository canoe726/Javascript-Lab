import { v4 as uuid } from 'uuid'
import { BarController } from './controller/BarController'
import { clearCanvas, retinaResolution } from './core/core.canvas'
import { ChartRenderer } from './core/core.chart'
import { Config } from './core/core.config'
import { Meta } from './core/core.meta'
import { ChartConfig } from './types/config.type'

function getChartController() {
  return {
    bar: BarController,
  }
}

export default class BigChart {
  id = uuid()
  controller = getChartController()
  canvasElement: HTMLCanvasElement | null
  meta: Meta | null
  ctx: CanvasRenderingContext2D | null
  config: Config | null

  constructor(_canvasElement: HTMLCanvasElement, _config: ChartConfig) {
    if (!_canvasElement) {
      throw new Error('Not found canvas element')
    }

    const canvasElement = (this.canvasElement = _canvasElement)

    this.meta = new Meta(_canvasElement)
    this.ctx = canvasElement.getContext('2d')
    this.config = new Config(_config)

    this._initialize()
  }

  _initialize() {
    if (this.canvasElement) {
      this.canvasElement.style.boxSizing = 'border-box'
    }

    retinaResolution(this)
    this.render()

    return this
  }

  destroy() {
    if (this.canvasElement) {
      clearCanvas(this.canvasElement, this.ctx)

      this.canvasElement = null
      this.meta = null
      this.ctx = null
      this.config = null
    }
  }

  render() {
    const chartRenderer = new ChartRenderer(this)

    chartRenderer.renderXAxis({ showLabel: true })
    chartRenderer.renderYAxis({ showLabel: true })
    chartRenderer.renderGrid()
    chartRenderer.renderChart()
  }
}
