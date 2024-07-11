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
      axisBaseStartX: 0.05,
      axisBaseEndX: 1,
      axisBaseStartY: 0,
      axisBaseEndY: 0.95,
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
