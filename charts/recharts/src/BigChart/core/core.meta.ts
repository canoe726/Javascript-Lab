import { ChartStyle } from '../constants/style'
import { CanvasMeta } from '../types/element.type'

export class Meta {
  _data: CanvasMeta

  constructor(canvasElement: HTMLCanvasElement) {
    this._data = this._initialize(canvasElement)
  }

  _initialize(canvasElement: HTMLCanvasElement) {
    const parent = canvasElement.parentElement
    const aspectRatio = '2/1'
    const [wAspectRatio, hAspectRatio] = aspectRatio.split('/')
    const width = parent?.clientWidth ? Math.floor(parent?.clientWidth * Number(hAspectRatio)) : 900
    const height = Math.floor(width / Number(wAspectRatio))

    const meta: CanvasMeta = {
      width,
      height,
      devicePixelRatio: window.devicePixelRatio || 1,
      currentDevicePixelRatio: undefined,
      axisBaseStartX: 0.04,
      axisBaseEndX: 0.99,
      axisBaseStartWidthX: width * 0.04,
      axisBaseEndWidthX: width * 0.99,
      axisWidthAmount: width * 0.95,
      axisBaseStartY: 0.02,
      axisBaseEndY: 0.95,
      axisBaseStartHeightY: height * 0.02,
      axisBaseEndHeightY: height * 0.95,
      axisHeightAmount: height * 0.93,
      axisBaseStrokeStyle: ChartStyle.axis.strokeStyle,
      gridStrokeStyle: ChartStyle.axis.strokeStyle,
    }
    return meta
  }

  get data() {
    return this._data
  }

  getDataByKey<K extends keyof CanvasMeta>(key: K) {
    return this.data[key]
  }

  setDataByKey<K extends keyof CanvasMeta>(key: K, value: CanvasMeta[K]) {
    this.data[key] = value
  }
}
