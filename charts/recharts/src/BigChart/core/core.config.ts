import { ChartConfig } from '../types/config.type'

export class Config {
  _config: ChartConfig

  constructor(config: ChartConfig) {
    this._config = config
  }

  get data() {
    return this._config.data
  }

  set data(data: ChartConfig['data']) {
    this._config.data = data
  }

  get type() {
    return this._config.type
  }

  set type(type: ChartConfig['type']) {
    this._config.type = type
  }
}
