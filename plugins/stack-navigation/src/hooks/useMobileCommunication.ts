'use client'

import { isAndroid, isIOS } from 'react-device-detect'
import Log from '../../utils/debug'
import { globalNavigationState } from '../StackNavigation/StackNavigation'

interface AndroidInterface {
  onWebViewClose: (payload?: any) => void
  /**
   * @param payload { enable: boolean }
   */
  onEnableHWBackButton: (payload?: any) => void
}

interface IOSInterface {
  webViewClose: {
    postMessage: (payload?: any) => void
  }
}

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webViewInterface: AndroidInterface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkit: {
      messageHandlers: IOSInterface
    }
  }
}

type AndroidFunctionType = keyof AndroidInterface
type IOSFunctionType = keyof IOSInterface

export default function useMobileCommunication() {
  const isAndroidInterfaceDefined = (functionType: AndroidFunctionType) => {
    if (
      window.webViewInterface === undefined ||
      window.webViewInterface[functionType] === undefined
    ) {
      return false
    }

    return true
  }

  const isIOSInterfaceDefined = (functionType: IOSFunctionType) => {
    if (
      window.webkit === undefined ||
      window.webkit.messageHandlers === undefined ||
      window.webkit.messageHandlers[functionType] === undefined
    ) {
      return false
    } else {
      return true
    }
  }

  const callNativeAndroidFunction = (
    functionType: AndroidFunctionType,
    payload: any = undefined,
  ) => {
    if (isAndroidInterfaceDefined(functionType)) {
      if (payload !== undefined) {
        window.webViewInterface[functionType](JSON.stringify(payload))
      } else {
        window.webViewInterface[functionType]()
      }
    } else {
      Log.info(`window.webViewInterface : ${JSON.stringify(window?.webViewInterface)}`)
      Log.error(`interface ${functionType} is not defined`)
    }
  }

  const callNativeiOSFunction = (functionType: IOSFunctionType, payload: any = undefined) => {
    if (isIOSInterfaceDefined(functionType)) {
      if (payload !== undefined) {
        window.webkit.messageHandlers[functionType].postMessage(payload)
      } else {
        window.webkit.messageHandlers[functionType].postMessage(null)
      }
    } else {
      Log.info(`window.webkit.messageHandlers : ${JSON.stringify(window?.webkit?.messageHandlers)}`)
      Log.error(`!pop interface ${functionType} is not defined`)
    }
  }

  const webViewClose = () => {
    isIOS && callNativeiOSFunction('webViewClose')
    isAndroid && callNativeAndroidFunction('onWebViewClose')
  }

  const enableHWBackButton = (
    payload: { enable: boolean },
    prevent?: { url?: string; callback?: () => void; disableHistoryPop?: boolean },
  ) => {
    const { url, callback, disableHistoryPop } = prevent ?? {}

    if (url && callback) {
      globalNavigationState.android.pushPreventHWBackButtonList({
        url,
        callback,
        disableHistoryPop,
      })
    }

    isAndroid && callNativeAndroidFunction('onEnableHWBackButton', payload)
  }

  return {
    callNativeAndroidFunction,
    callNativeiOSFunction,
    webViewClose,
    enableHWBackButton,
  }
}
