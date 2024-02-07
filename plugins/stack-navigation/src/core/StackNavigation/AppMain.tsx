'use client'

import classNames from 'classnames'
import { useContext, useEffect, useState } from 'react'
import { isAndroid, isIOS } from 'react-device-detect'

import { StackNavigationContext, globalNavigationState } from './StackNavigation'
import StackRoute from './StackRoute'
import { INITIAL_URL } from './StackRoute.const'
import { getAppPathInfo } from './StackRoute.util'
import { useAppRouter } from './useAppRouter'

import type { StackNavigationParams } from './StackRoute.type'

import useMobileCommunication from '../../hooks/useMobileCommunication'
import useMounted from '../../hooks/useMounted'
import './StackNavigation.css'

export interface ActivityRoute {
  key: string
  activityName: string
  activity: JSX.Element
}

export interface AppMainProps {
  activityRouteList: ActivityRoute[]
}

let debounce: null | ReturnType<typeof setTimeout> = null

export default function AppMain({ activityRouteList }: AppMainProps) {
  const { enableHWBackButton } = useMobileCommunication()
  const { navigationData } = useContext(StackNavigationContext)
  const appRouter = useAppRouter()
  const { mounted } = useMounted()

  const [isInitialPageFirstLoaded, setIsInitialPageFirstLoaded] = useState(true)

  useEffect(() => {
    if (mounted) {
      const pathname = globalNavigationState.initialHref

      if (isAndroid) {
        enableHWBackButton({ enable: false })
      }

      if (pathname !== INITIAL_URL) {
        setIsInitialPageFirstLoaded(false)

        const [activityName, ...queryParams] = pathname.replace('/#/', '').split('&')
        const paramsIndex = queryParams.findIndex((paramter) => paramter.includes('params='))
        const activityParams: StackNavigationParams = {}

        if (paramsIndex >= 0) {
          const paramsString = queryParams[paramsIndex]
          const params = paramsString.replace('params=', '')
          const parameterList = params.split(',')

          parameterList.forEach((parameter) => {
            const [key, value] = parameter.split(':')

            activityParams[key] = value
          })
        }

        appRouter.replace(activityName, activityParams)
      }
    }
  }, [mounted])

  useEffect(() => {
    const setIOSMobileStyle = () => {
      const htmlElement = window.document.documentElement
      const bodyElement = window.document.body
      const mobileRootElement = window.document.getElementById('mobile-root')

      htmlElement.style.overflow = 'hidden'
      bodyElement.style.overflow = 'hidden'

      if (mobileRootElement) {
        mobileRootElement.style.overflow = 'hidden'
      }
    }

    if (isIOS) {
      setIOSMobileStyle()
    }
  }, [isIOS])

  useEffect(() => {
    if (!isInitialPageFirstLoaded && navigationData.length > 1) {
      enableHWBackButton(
        { enable: false },
        {
          url: navigationData[navigationData.length - 1].url,
          callback: () => {
            appRouter.pop({ preventHistoryPop: true })
          },
        },
      )

      setIsInitialPageFirstLoaded(true)
    }
  }, [isInitialPageFirstLoaded, navigationData])

  useEffect(() => {
    const handleWindowPopstate = () => {
      if (globalNavigationState.preventPopstate) {
        globalNavigationState.preventPopstate = false
      } else {
        const { activityName, params, appUrl } = getAppPathInfo(window.location.href)
        const allActivities = appRouter.getAllActivities()

        const topIndex = allActivities.findLastIndex((activity) => activity.url === appUrl)
        const isPushActivity = topIndex < 0

        if (isPushActivity) {
          appRouter.push(activityName, params)
        } else {
          appRouter.pop({ isPopstate: true })
        }
      }
    }

    const handleAndroidBackButtonPressedEvent = (event: Event) => {
      if ((event as any).data === 'backButtonPressed') {
        if (debounce) {
          clearTimeout(debounce)
        }

        debounce = setTimeout(() => {
          const isPreventFunctionCall =
            globalNavigationState.android.preventHWBackButtonList.length > 0

          if (isPreventFunctionCall) {
            const appHref = window.location.href.replace(window.location.origin, '')
            const [appUrl, _] = appHref.split('&')

            const { callback, url } =
              globalNavigationState.android.getLastPreventHWBackButtonList() ?? {}

            if (url === appUrl && callback) {
              callback()
              globalNavigationState.android.popPreventHWBackButtonList()
            } else {
              appRouter.pop({ preventHistoryPop: true })
            }
            return
          }

          appRouter.pop({ preventHistoryPop: true })
        }, 50)
      }
    }

    window.addEventListener('popstate', handleWindowPopstate)
    window.addEventListener('message', handleAndroidBackButtonPressedEvent)

    return () => {
      window.removeEventListener('popstate', handleWindowPopstate)
      window.addEventListener('message', handleAndroidBackButtonPressedEvent)
    }
  }, [navigationData])

  return (
    <main id="stack-navagation-root" className="relative h-full w-full">
      {navigationData.map(({ activityName, url }, depth) => {
        const stackSize = navigationData.length - 1
        const isTop = depth === stackSize
        const isSeconod = depth === stackSize - 1
        const hideStack = !isTop && !isSeconod

        return (
          <div
            key={url}
            id={url}
            className={classNames('h-full w-full ', {
              'absolute left-0 top-0 z-20': isTop,
              'absolute left-0 top-0 z-10': isSeconod,
              hidden: hideStack,
            })}
          >
            {activityRouteList &&
              activityRouteList.map(({ key, activity, activityName: routeName }) => {
                return (
                  <StackRoute key={key} show={activityName === routeName} depth={depth}>
                    {activity}
                  </StackRoute>
                )
              })}
          </div>
        )
      })}
    </main>
  )
}
