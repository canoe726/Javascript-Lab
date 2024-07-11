export type ChartType = 'bar'

export interface ChartDataConfig {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }[]
}

export interface ChartConfig {
  type: ChartType
  data: ChartDataConfig
}
