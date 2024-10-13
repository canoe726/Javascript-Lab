import { Performance } from '../../common'

function drawGrid(
  context: CanvasRenderingContext2D,
  strokeStyle: string | CanvasGradient | CanvasPattern,
  fillStyle: string | CanvasGradient | CanvasPattern,
) {
  context.save()

  context.strokeStyle = strokeStyle
  context.fillStyle = fillStyle

  context.restore()
}

function runContext(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) {
  context.font = '38pt Arial'
  context.fillStyle = 'cornflowerblue'
  context.strokeStyle = 'blue'

  context.fillText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15)
  context.strokeText('Hello Canvas', canvas.width / 2 - 150, canvas.height / 2 + 15)
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
