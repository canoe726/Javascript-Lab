import { Performance } from '../../common'

class Clock {
  canvas: HTMLCanvasElement
  context: CanvasRenderingContext2D
  FONT_HEIGHT = 15
  MARGIN = 35
  HARD_TRUNCATION
  HOUR_HAND_TRUNCATION
  NUMERAL_SPACING = 20
  RADIUS
  HAND_RADIUS

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
    this.canvas = canvas
    this.context = context

    this.HARD_TRUNCATION = canvas.width / 25
    this.HOUR_HAND_TRUNCATION = canvas.width / 10
    this.RADIUS = canvas.width / 2 - this.MARGIN
    this.HAND_RADIUS = this.RADIUS + this.NUMERAL_SPACING

    this.context.font = this.FONT_HEIGHT + 'px Arial'
  }

  drawCircle() {
    this.context.beginPath()
    this.context.arc(
      this.canvas.width / 2,
      this.canvas.height / 2,
      this.RADIUS,
      0,
      Math.PI * 2,
      true,
    )
    this.context.stroke()
  }

  drawNumerals() {
    const numerals = Array.from({ length: 12 }, (_, index) => index + 1)
    let angle = 0
    let numeralWidth = 0

    numerals.forEach((numeral) => {
      angle = (Math.PI / 6) * (numeral - 3)
      numeralWidth = this.context.measureText(`${numeral}`).width
      this.context.fillText(
        `${numeral}`,
        this.canvas.width / 2 + Math.cos(angle) * this.HAND_RADIUS - numeralWidth / 2,
        this.canvas.height / 2 + Math.sin(angle) * this.HAND_RADIUS + this.FONT_HEIGHT / 3,
      )
    })
  }

  drawCenter() {
    this.context.beginPath()
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, 5, 0, Math.PI * 2, true)
    this.context.fill()
  }

  drawHand(loc: number, isHour: boolean, thickness: number) {
    const angle = Math.PI * 2 * (loc / 60) - Math.PI / 2
    const handRadius = isHour
      ? this.RADIUS - this.HARD_TRUNCATION - this.HOUR_HAND_TRUNCATION
      : this.RADIUS - this.HARD_TRUNCATION

    this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2)
    this.context.lineTo(
      this.canvas.width / 2 + Math.cos(angle) * handRadius,
      this.canvas.height / 2 + Math.sin(angle) * handRadius,
    )
    this.context.lineWidth = thickness
    this.context.stroke()
  }

  drawHands() {
    const date = new Date()
    let hour = date.getHours()
    hour = hour > 12 ? hour - 12 : hour

    this.drawHand(hour * 5 + (date.getMinutes() / 60) * 5, true, 3)
    this.drawHand(date.getMinutes(), false, 2)
    this.drawHand(date.getSeconds(), false, 0.5)
  }

  drawClock() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.drawCircle()
    this.drawNumerals()
    this.drawCenter()
    this.drawHands()
  }
}

function runContext(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  const clock = new Clock(canvas, context)

  const loop = setInterval(() => {
    clock.drawClock()
  }, 1000)
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
