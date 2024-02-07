import qs from 'qs'

import type { StackNavigationParams } from './StackRoute.type'

export const getValidParams = (params?: StackNavigationParams) => {
  if (params) {
    const nextParams: StackNavigationParams = {}

    Object.entries(params).forEach(([key, value]) => {
      if (key && value && value.length > 0) {
        nextParams[key] = value
      }
    })

    return nextParams
  } else {
    return {}
  }
}

export const getAppParams = (params?: StackNavigationParams) => {
  let appParams = ''
  const validParams = getValidParams(params)

  if (validParams && Object.keys(validParams).length > 0) {
    appParams = '&params='

    Object.entries(validParams).map(([key, value]) => {
      if (appParams === '&params=') {
        appParams += `${key}:${value}`
      } else {
        appParams += `,${key}:${value}`
      }
    })
  }

  return appParams
}

export const getAppPathInfo = (
  href: string,
): {
  activityName: string
  appUrl: string
  params: StackNavigationParams
} => {
  const appHref = href.replace(window.location.origin, '')
  const [appUrl, queryParams] = appHref.split('&')
  const queryObject = qs.parse(queryParams)
  const params: { [key: string]: string } = {}
  const activityName = appUrl.replace('/#/', '')

  if (queryObject?.params) {
    const paramString = queryObject.params as string
    const paramList = paramString.split(',')

    paramList.forEach((param) => {
      const [key, value] = param.split(':')
      params[key] = value
    })
  }

  return {
    activityName,
    params,
    appUrl: appHref,
  }
}
