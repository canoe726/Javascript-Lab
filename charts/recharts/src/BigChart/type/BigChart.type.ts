export type ChartType = 'bar'

export interface BigChartDataProps {
  labels: string[]
  datasets: {
    label: string
    data: number[]
  }[]
}

export interface BigChartProps {
  type: ChartType
  data: BigChartDataProps
}

export interface CanvasElementProps {
  width: number
  height: number
  devicePixelRatio: number
  axis: {
    baseStartX: number
    baseEndX: number
    baseStartY: number
    baseEndY: number
    strokeStyle: string
  }
  grid: {
    strokeStyle: string
  }
}
