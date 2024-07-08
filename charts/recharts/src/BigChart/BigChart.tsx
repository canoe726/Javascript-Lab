import { BigChartProps, CanvasElementProps } from './type/BigChart.type'
import { DrawLineOptions, RenderXAxisOptions } from './type/chart.type'
import { getFloor } from './utils/number'

export default class BigChart {
  canvasElement: HTMLCanvasElement
  canvasProps: CanvasElementProps
  ctx: CanvasRenderingContext2D
  props: BigChartProps

  constructor(canvasElement: HTMLCanvasElement, props: BigChartProps) {
    this.canvasElement = canvasElement
    this.canvasProps = {
      width: canvasElement.width,
      height: canvasElement.height,
      devicePixelRatio: window.devicePixelRatio || 1,
      axis: {
        baseStartX: 0.04,
        baseEndX: 1,
        baseStartY: 0,
        baseEndY: 0.95,
        strokeStyle: '#C0C0C0',
      },
      grid: {
        strokeStyle: '#D0D0D0',
      },
    }
    this.ctx = canvasElement.getContext('2d')!
    this.props = props

    this.initialize()
    this.render()
  }

  drawLine(
    ctx: CanvasRenderingContext2D,
    sx: number,
    sy: number,
    dx: number,
    dy: number,
    options?: DrawLineOptions,
  ) {
    ctx.beginPath()
    ctx.moveTo(sx, sy)
    ctx.lineTo(dx, dy)

    if (options?.lineWidth) {
      ctx.lineWidth = options?.lineWidth
    }
    if (options?.strokeStyle) {
      ctx.strokeStyle = options?.strokeStyle
    }

    ctx.stroke()
  }

  initialize() {
    const { width, height, devicePixelRatio } = this.canvasProps
    const canvasElement = this.canvasElement

    canvasElement.width = width * devicePixelRatio
    canvasElement.height = height * devicePixelRatio
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
    console.log('initialize1')

    this.ctx.scale(devicePixelRatio, devicePixelRatio)
  }

  render() {
    this.renderXAxis({ showLabel: true })
    this.renderYAxis()
    this.renderGrid()
    this.renderChart()
  }

  renderXAxis(options?: RenderXAxisOptions) {
    const ctx = this.ctx
    const {
      width,
      height,
      axis: { baseStartX, baseEndY, strokeStyle },
    } = this.canvasProps

    const xAxisPos = [
      [width * baseStartX, height * baseEndY],
      [width, height * baseEndY],
    ]
    const xAxisStartPos = xAxisPos[0]
    const xAxisEndPos = xAxisPos[1]

    this.drawLine(ctx, xAxisStartPos[0], xAxisStartPos[1], xAxisEndPos[0], xAxisEndPos[1], {
      strokeStyle,
    })

    if (options?.showLabel) {
      const labels = this.props.data.labels
      const columnGridCounts = labels.length
      const startXWidth = width * baseStartX
      const columnWidth = getFloor((width - startXWidth) / columnGridCounts) as number

      for (let i = 0; i < columnGridCounts + 1; i++) {
        const label = labels[i]
        const textString = this.ctx.measureText(label).width
        const startX =
          startXWidth +
          columnWidth * i +
          (getFloor(columnWidth / 2) as number) -
          (getFloor(textString / 2) as number)

        this.ctx.fillText(label, startX, height)
      }
    }
  }

  renderYAxis() {
    const ctx = this.ctx
    const {
      width,
      height,
      axis: { baseStartX, baseEndY, strokeStyle },
    } = this.canvasProps

    const yAxisPos = [
      [width * baseStartX, height * 0],
      [width * baseStartX, height * baseEndY],
    ]
    const yAxisStartPos = yAxisPos[0]
    const yAxisEndPos = yAxisPos[1]

    this.drawLine(ctx, yAxisStartPos[0], yAxisStartPos[1], yAxisEndPos[0], yAxisEndPos[1], {
      fillStyle: strokeStyle,
    })
  }

  renderGrid() {
    const ctx = this.ctx
    const {
      width,
      height,
      axis: { baseStartX },
    } = this.canvasProps
    const columnGridCounts = this.props.data.labels.length
    const startXWidth = width * baseStartX
    const columnWidth = getFloor((width - startXWidth) / columnGridCounts) as number

    for (let i = 0; i < columnGridCounts + 1; i++) {
      const startX = startXWidth + columnWidth * i

      this.drawLine(ctx, startX, 0, startX, height)
    }
  }

  renderChart() {
    if (this.props.type === 'bar') {
      this.renderBarChart()
    }
  }

  renderBarChart() {
    const ctx = this.ctx
    const {
      width,
      height,
      axis: { baseStartX, baseEndY },
    } = this.canvasProps

    // this.drawLine(ctx, 0, 0, 100, 0)
  }
}
