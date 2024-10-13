import { Performance } from '../../common'

class SpriteSheet {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  spriteSheet: HTMLImageElement
  readoutElem: HTMLDivElement
  VERTICAL_LINE_SPACING = 12

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context
    this.spriteSheet = new Image()
    this.readoutElem = document.getElementById('readout') as HTMLDivElement
  }

  init() {
    this.initSprite()
    this.initGuideline()
  }

  initSprite() {
    this.spriteSheet.src = '../../public/cat-sprite.png'
    this.spriteSheet.onload = () => {
      this.drawSpritesheet()
    }
    this.drawBackground()
  }

  initGuideline() {
    this.canvas.onmousemove = (e) => {
      const loc = this.windowToCanvas(e.clientX, e.clientY)

      this.drawBackground()
      this.drawSpritesheet()
      this.drawGuidelines(loc.x, loc.y)
      this.updateReadout(loc.x, loc.y)
    }
  }

  windowToCanvas(x: number, y: number) {
    const bbox = this.canvas.getBoundingClientRect()
    return {
      x: x - bbox.left * (this.canvas.width / bbox.width),
      y: y - bbox.top * (this.canvas.height / bbox.height),
    }
  }

  drawBackground() {
    let i = this.context.canvas.height

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.context.strokeStyle = 'lightgray'
    this.context.lineWidth = 0.5

    while (i > this.VERTICAL_LINE_SPACING * 4) {
      this.context.beginPath()
      this.context.moveTo(0, i)
      this.context.lineTo(this.context.canvas.width, i)
      this.context.stroke()
      i -= this.VERTICAL_LINE_SPACING
    }
  }

  drawSpritesheet() {
    this.context.drawImage(this.spriteSheet, 0, 0)
  }

  drawGuidelines(x: number, y: number) {
    this.context.strokeStyle = 'rgba(0, 0, 230, 0.8)'
    this.context.lineWidth = 0.5
    this.drawVerticalLine(x)
    this.drawHorizontalLine(y)
  }

  drawVerticalLine(x: number) {
    this.context.beginPath()
    this.context.moveTo(x + 0.5, 0)
    this.context.lineTo(x + 0.5, this.context.canvas.height)
    this.context.stroke()
  }

  drawHorizontalLine(y: number) {
    this.context.beginPath()
    this.context.moveTo(0, y + 0.5)
    this.context.lineTo(this.context.canvas.width, y + 0.5)
    this.context.stroke()
  }

  updateReadout(x: number, y: number) {
    this.readoutElem.innerText = `(${x.toFixed(0)}, ${y.toFixed(0)})`
  }
}

function runContext(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const spriteSheet = new SpriteSheet(canvas, context)
  spriteSheet.init()
}

function main() {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  if (canvas) {
    const context = canvas.getContext('2d')
    if (context) {
      const measure = Performance.measurePerformance(() => {
        runContext(canvas, context)
      })
      console.log('measure: ', measure)
    }
  }
}

main()
