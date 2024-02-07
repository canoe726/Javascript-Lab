import type { NavigationState, StackNavigationDataProps } from './StackRoute.type'

export const BASE_APP_URL = '/#'
export const INITIAL_ACTIVITY = 'main'
export const INITIAL_URL = `/#/${INITIAL_ACTIVITY}`

export const PAGE_TRANSITION_TIMEOUT = 275
export const POP_PAGE_TRANSITION_TIMEOUT = 150

export const rootActivity: StackNavigationDataProps = {
  state: 'root',
  activityName: INITIAL_ACTIVITY,
  url: INITIAL_URL,
  params: {},
}

export const pageTransitionMap: {
  [_ in NavigationState]: string
} = {
  push: 'page-transition-push',
  pop: 'page-transition-pop',
  popup: '',
  replace: '',
  root: '',
}
