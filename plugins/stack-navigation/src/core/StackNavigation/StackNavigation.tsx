'use client'

import type { Dispatch, SetStateAction } from 'react'

import { createContext, useEffect, useState } from 'react'

import { INITIAL_URL, rootActivity } from './StackRoute.const'

import type { StackNavigationDataProps } from './StackRoute.type'

interface PreventBackButtonInfo {
  callback: null | (() => void)
  url: string
  disableHistoryPop?: boolean
}

export const globalNavigationState: {
  preventPopstate: boolean
  isSwipeBackPop: boolean
  isTopPageSwipeBackMove: boolean
  initialHref: string
  android: {
    preventHWBackButtonList: PreventBackButtonInfo[]
    getLastPreventHWBackButtonList: () => PreventBackButtonInfo | null
    pushPreventHWBackButtonList: (preventHWBackButton: PreventBackButtonInfo) => void
    popPreventHWBackButtonList: () => void
  }
} = {
  preventPopstate: false,
  isSwipeBackPop: false,
  isTopPageSwipeBackMove: false,
  initialHref: INITIAL_URL,
  android: {
    preventHWBackButtonList: [],
    getLastPreventHWBackButtonList: () => {
      const exist = globalNavigationState.android?.preventHWBackButtonList?.length > 0

      if (exist) {
        const length = globalNavigationState.android.preventHWBackButtonList.length

        return globalNavigationState.android.preventHWBackButtonList[length - 1]
      } else {
        return null
      }
    },
    pushPreventHWBackButtonList: (preventHWBackButton: PreventBackButtonInfo) => {
      globalNavigationState.android.preventHWBackButtonList = [
        ...globalNavigationState.android.preventHWBackButtonList,
        preventHWBackButton,
      ]
    },
    popPreventHWBackButtonList: () => {
      globalNavigationState.android.preventHWBackButtonList = [
        ...globalNavigationState.android.preventHWBackButtonList.slice(
          0,
          globalNavigationState.android.preventHWBackButtonList.length - 1,
        ),
      ]
    },
  },
}

export interface StackNavigationContextProps {
  navigationData: StackNavigationDataProps[]
  currentActivity: StackNavigationDataProps
  setNavigationData: Dispatch<SetStateAction<StackNavigationDataProps[]>>
  setCurrentActivity: (currentActivity: StackNavigationDataProps) => void
}

export const StackNavigationContext = createContext<StackNavigationContextProps>({
  navigationData: [],
  currentActivity: rootActivity,
  setNavigationData: () => {
    //
  },
  setCurrentActivity: () => {
    //
  },
})

export interface StackNavigationProps {
  show?: boolean
  children: JSX.Element
}

export default function StackNavigation({ show = true, children }: StackNavigationProps) {
  const [navigationData, setNavigationData] = useState<StackNavigationDataProps[]>([rootActivity])
  const [currentActivity, setCurrentActivity] = useState<StackNavigationDataProps>(rootActivity)
  const router = useRouter()

  useEffect(() => {
    const pathname = window.location.href.replace(window.location.origin, '')
    if (pathname !== '/') {
      globalNavigationState.initialHref = pathname
    }
    router.replace(INITIAL_URL)
  }, [])

  return show ? (
    <>
      <StackNavigationContext.Provider
        value={{
          navigationData,
          currentActivity,
          setNavigationData,
          setCurrentActivity,
        }}
      >
        {children}
      </StackNavigationContext.Provider>
    </>
  ) : null
}
