export interface StackRouteProps {
  show: boolean
  children: JSX.Element
  depth: number
}

export interface StackNavigationParams {
  [key: string]: string
}

export interface StackNavigationDataProps {
  state: NavigationState
  activityName: string
  url: string
  params: StackNavigationParams
}

export type NavigationState = 'root' | 'push' | 'pop' | 'replace' | 'popup'
