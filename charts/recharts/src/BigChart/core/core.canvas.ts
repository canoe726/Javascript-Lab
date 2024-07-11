import BigChart from '../BigChart'
import { DrawLineOptions } from '../types/render.type'

export function retinaResolution(chart: BigChart) {
  if (!chart.meta || !chart.canvasElement || !chart.ctx) {
    return
  }

  const { width, height, devicePixelRatio, currentDevicePixelRatio } = chart.meta.data ?? {}
  const canvasElement = chart.canvasElement
  const ctx = chart.ctx
  const deviceWidth = Math.floor(width * devicePixelRatio)
  const deviceHeight = Math.floor(height * devicePixelRatio)

  if (canvasElement.style && !canvasElement.style.width && !canvasElement.style.height) {
    canvasElement.style.width = `${width}px`
    canvasElement.style.height = `${height}px`
  }

  if (
    currentDevicePixelRatio !== devicePixelRatio ||
    canvasElement.width !== deviceWidth ||
    canvasElement.height !== deviceHeight
  ) {
    canvasElement.width = deviceWidth
    canvasElement.height = deviceHeight

    ctx.scale(devicePixelRatio, devicePixelRatio)
    chart.meta.setDataByKey('currentDevicePixelRatio', devicePixelRatio)
    console.log('---set core render---')

    return true
  }

  return false
}

export function clearCanvas(
  canvasElement: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D | null,
) {
  if (!ctx) {
    return
  }

  ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  ctx.restore()
}

export function drawLine(
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
