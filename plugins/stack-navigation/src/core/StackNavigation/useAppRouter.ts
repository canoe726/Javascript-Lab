import { useContext } from 'react'
import { isAndroid, isIOS } from 'react-device-detect'

import { StackNavigationContext, globalNavigationState } from './StackNavigation'
import {
  BASE_APP_URL,
  PAGE_TRANSITION_TIMEOUT,
  POP_PAGE_TRANSITION_TIMEOUT,
} from './StackRoute.const'
import { getAppParams, getValidParams } from './StackRoute.util'

import type { StackNavigationDataProps, StackNavigationParams } from './StackRoute.type'

const DEBOUNCE_DELAY = 20

export const useAppRouter = () => {
  const router = useRouter()

  const { debounce } = useDebounce()
  const { currentActivity, navigationData, setCurrentActivity, setNavigationData } =
    useContext(StackNavigationContext)
  const { webViewClose } = useMobileCommunication()

  const getAllActivities = () => {
    return navigationData
  }

  const getCurrentActivityInfo = () => {
    return currentActivity
  }

  const push = (activityName: string, params?: StackNavigationParams) => {
    debounce(() => {
      const url = `${BASE_APP_URL}/${activityName}${getAppParams(params)}`
      const nextActivity: StackNavigationDataProps = {
        activityName,
        url,
        params: getValidParams(params),
        state: 'push',
      }

      setNavigationData([...navigationData, nextActivity])
      setCurrentActivity({ ...nextActivity })

      router.push(url)
    }, DEBOUNCE_DELAY)
  }

  const replace = (activityName: string, params?: StackNavigationParams) => {
    debounce(() => {
      const url = `${BASE_APP_URL}/${activityName}${getAppParams(params)}`
      const nextActivity: StackNavigationDataProps = {
        activityName,
        url,
        params: getValidParams(params),
        state: 'replace',
      }
      const lastNavigationData = navigationData[navigationData.length - 1]

      if (lastNavigationData.state === 'root') {
        setNavigationData([...navigationData, nextActivity])
        setCurrentActivity({ ...nextActivity })

        router.push(url)
      } else {
        const nextNavigationDate = [...navigationData]
        nextNavigationDate[nextNavigationDate.length - 1] = nextActivity

        setNavigationData([...nextNavigationDate])
        setCurrentActivity({ ...nextNavigationDate[nextNavigationDate.length - 1] })

        router.replace(url)
      }
    }, DEBOUNCE_DELAY)
  }

  const pop = (props?: {
    isPopstate?: boolean
    isSwipeBack?: boolean
    preventHistoryPop?: boolean
  }) => {
    debounce(() => {
      const { isPopstate, isSwipeBack, preventHistoryPop } = props ?? {}

      const isHandlePressedHWBackButton = preventHistoryPop === true
      const stackLength = navigationData.length

      if (stackLength === 1) {
        webViewClose()
      }

      if (stackLength > 1) {
        const nextNavigationData = navigationData.slice()
        nextNavigationData[stackLength - 1].state = 'pop'

        setCurrentActivity({ ...navigationData[stackLength - 1] })

        if (isAndroid) {
          setNavigationData([
            ...nextNavigationData.slice(0, stackLength - 1),
            ...nextNavigationData.slice(stackLength),
          ])

          if (isPopstate !== true || isSwipeBack === true) {
            globalNavigationState.preventPopstate = true

            if (preventHistoryPop !== true) {
              router.back()
            } else {
              if (isHandlePressedHWBackButton) {
                window.location.href = navigationData[stackLength - 2].url
                globalNavigationState.preventPopstate = false
              }
            }
          }
        }

        if (isIOS) {
          const transitionTime =
            isPopstate === true || isSwipeBack !== true
              ? PAGE_TRANSITION_TIMEOUT + POP_PAGE_TRANSITION_TIMEOUT
              : POP_PAGE_TRANSITION_TIMEOUT

          setTimeout(() => {
            setNavigationData([
              ...nextNavigationData.slice(0, stackLength - 1),
              ...nextNavigationData.slice(stackLength),
            ])

            if (isPopstate !== true || isSwipeBack === true) {
              globalNavigationState.preventPopstate = true

              if (preventHistoryPop !== true) {
                router.back()
              } else {
                if (isHandlePressedHWBackButton) {
                  window.location.href = navigationData[stackLength - 2].url
                  globalNavigationState.preventPopstate = false
                }
              }
            }
          }, transitionTime)
        }
      }
    }, DEBOUNCE_DELAY)
  }

  return {
    push,
    pop,
    replace,
    getCurrentActivityInfo,
    getAllActivities,
  }
}
