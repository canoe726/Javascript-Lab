interface BigChartProps {
  type: 'line'
  data: {
    labels: string[]
    datasets: {
      data: number[]
    }
  }
}

export default class BigChart {
  canvasElement: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  props?: BigChartProps

  constructor(canvasElement: HTMLCanvasElement, props?: BigChartProps) {
    this.canvasElement = canvasElement
    this.ctx = canvasElement.getContext('2d')!
    this.props = props
    this.render(canvasElement)
  }

  render(canvasElement: HTMLCanvasElement) {
    window.addEventListener('load', () => {
      this.renderChart()
    })
  }

  drawLine(ctx: CanvasRenderingContext2D, sx: number, sy: number, dx: number, dy: number) {
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(100, 0)
    ctx.stroke()
    ctx.closePath()
  }

  renderChart() {
    const canvas = document.getElementById('chart') as HTMLCanvasElement
    const ctx = canvas.getContext('2d')!
    console.log('called')

    this.drawLine(ctx, 0, 0, 100, 0)
  }
}
