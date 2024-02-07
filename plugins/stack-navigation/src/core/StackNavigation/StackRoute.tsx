import type { TouchEvent } from 'react'

import classNames from 'classnames'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { isAndroid, isIOS } from 'react-device-detect'

import { StackNavigationContext } from './StackNavigation'
import {
  PAGE_TRANSITION_TIMEOUT,
  POP_PAGE_TRANSITION_TIMEOUT,
  pageTransitionMap,
} from './StackRoute.const'

import type { StackRouteProps } from './StackRoute.type'
import { useAppRouter } from './useAppRouter'

const UNDERNEATH_DEFAULT_LEFT = 30

export default function StackRoute({ show, children, depth }: StackRouteProps) {
  const router = useAppRouter()

  const { currentActivity, navigationData } = useContext(StackNavigationContext)
  const stackIndex = navigationData.length - 1
  const { state } = currentActivity
  const isStackPageRouteHidden = state === 'push' && depth === stackIndex

  const [showStackPageDim, setShowStackPageDim] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const pageDimRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({
    x: -1,
    y: -1,
  })
  const pageTransitionTrigger = useRef(false)
  const popPageTransitionOccured = useRef(false)
  const isTouchStart = useRef(false)
  const isTouchMove = useRef(false)

  const underneathStackPage = useMemo(() => {
    const underneathUrl = navigationData?.[stackIndex - 1]?.url
    const element = document
      .getElementById(underneathUrl)
      ?.querySelector('.stack-page-root') as HTMLDivElement | null

    return element
  }, [navigationData])

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0]
    const windowWidth = window.document.body.clientWidth

    isTouchStart.current = true

    mousePosition.current.x = clientX
    mousePosition.current.y = clientY
    popPageTransitionOccured.current = false

    const threshold = clientX / windowWidth
    if (isIOS && threshold <= 0.1 && clientY >= 45 && stackIndex > 0 && depth !== 0) {
      pageTransitionTrigger.current = true
    }
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const { x } = mousePosition.current
    const { clientX } = event.touches[0]
    const windowWidth = window.document.body.clientWidth

    if (isIOS) {
      if (isTouchStart.current && pageTransitionTrigger.current && ref.current && clientX >= x) {
        isTouchMove.current = true
        const diff = clientX - x

        if (diff >= windowWidth * 0.55) {
          popPageTransitionOccured.current = true
          isTouchStart.current = false

          ref.current.style.transition = `transform ${PAGE_TRANSITION_TIMEOUT / 1000}s ease`
          requestAnimationFrame(() => {
            if (ref.current) {
              ref.current.style.transform = `translate3d(${windowWidth}px, 0, 0)`
            }

            if (underneathStackPage) {
              underneathStackPage.style.transition = `transform ${
                PAGE_TRANSITION_TIMEOUT / 1000
              }s ease`
              underneathStackPage.style.transform = 'translate3d(0%, 0, 0)'
            }
          })

          setTimeout(() => {
            if (ref.current) {
              ref.current.style.transition = ''
            }
          }, PAGE_TRANSITION_TIMEOUT * 1.5)

          setTimeout(() => {
            router.pop({ isSwipeBack: true })
          }, POP_PAGE_TRANSITION_TIMEOUT)
        } else {
          requestAnimationFrame(() => {
            if (pageDimRef.current) {
              pageDimRef.current.style.opacity = `${0.6 - diff / (windowWidth * 0.9)}`
            }

            if (ref.current) {
              ref.current.style.transform = `translate3d(${diff}px, 0, 0)`
            }

            if (underneathStackPage) {
              const underneathLeft =
                -UNDERNEATH_DEFAULT_LEFT + (diff / windowWidth) * UNDERNEATH_DEFAULT_LEFT

              underneathStackPage.style.transition = ''
              underneathStackPage.style.transform = `translate3d(${underneathLeft}%, 0, 0)`
            }
          })
        }
      }
    }
  }

  const handleTouchEnd = () => {
    if (!popPageTransitionOccured.current && ref.current && pageTransitionTrigger.current) {
      if (isIOS) {
        ref.current.style.transition = `transform ${PAGE_TRANSITION_TIMEOUT / 1000}s ease`

        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.style.transform = 'translate3d(0%, 0px, 0px)'
          }

          if (underneathStackPage) {
            underneathStackPage.style.transition = 'transform 0.3s ease'
            underneathStackPage.style.transform = `translate3d(-${UNDERNEATH_DEFAULT_LEFT}%, 0, 0)`
          }
        })

        setTimeout(() => {
          if (ref.current) {
            ref.current.style.transition = ''
          }
        }, PAGE_TRANSITION_TIMEOUT * 1.5)
      }
    }

    isTouchStart.current = false
    isTouchMove.current = false
    pageTransitionTrigger.current = false

    mousePosition.current.x = -1
    mousePosition.current.y = -1
  }

  useEffect(() => {
    if (depth === navigationData.length - 1) {
      setTimeout(() => {
        setShowStackPageDim(true)
      }, PAGE_TRANSITION_TIMEOUT * 2)
    } else {
      setTimeout(() => {
        setShowStackPageDim(false)
      }, POP_PAGE_TRANSITION_TIMEOUT * 2)
    }
  }, [navigationData])

  useEffect(() => {
    if (currentActivity.state === 'pop' && pageDimRef.current) {
      if (isIOS) {
        pageDimRef.current.style.transition = `opacity ${POP_PAGE_TRANSITION_TIMEOUT / 1000}s ease`

        requestAnimationFrame(() => {
          if (pageDimRef.current) {
            pageDimRef.current.style.opacity = '0'
          }

          if (underneathStackPage) {
            underneathStackPage.style.transition = 'transform 0.3s ease'
            underneathStackPage.style.transform = 'translate3d(0%, 0, 0)'

            setTimeout(() => {
              if (underneathStackPage) {
                underneathStackPage.style.transition = ''
                underneathStackPage.style.transform = ''
              }
            }, PAGE_TRANSITION_TIMEOUT * 2)
          }
        })
      }
    }
  }, [currentActivity])

  useEffect(() => {
    if (show && stackIndex === depth && pageTransitionMap?.[state] !== undefined) {
      if (isAndroid) {
        if (ref.current) {
          ref.current.classList.remove('hidden')
          ref.current.style.transform = 'translate3d(0%, 0%, 0)'
        }
      }

      if (isIOS) {
        requestAnimationFrame(() => {
          if (ref.current) {
            ref.current.classList.remove('hidden')
            ref.current.classList.add(`${pageTransitionMap[state]}-enter`)
          }
        })

        setTimeout(() => {
          requestAnimationFrame(() => {
            if (ref.current) {
              ref.current.classList.remove(`${pageTransitionMap[state]}-enter`)
              ref.current.classList.add(`${pageTransitionMap[state]}-enter-active`)
            }

            if (currentActivity.state === 'push' || currentActivity.state === 'replace') {
              if (underneathStackPage) {
                underneathStackPage.style.transition = 'transform 0.3s ease'
                underneathStackPage.style.transform = `translate3d(-${UNDERNEATH_DEFAULT_LEFT}%, 0, 0)`
              }
            }
          })
        }, PAGE_TRANSITION_TIMEOUT)

        setTimeout(() => {
          requestAnimationFrame(() => {
            if (ref.current) {
              ref.current.classList.remove(`${pageTransitionMap[state]}-enter-active`)

              if (currentActivity.state === 'pop') {
                ref.current.classList.add('hidden')
              }
            }
          })
        }, PAGE_TRANSITION_TIMEOUT * 2)
      }
    }
  }, [show, currentActivity])

  return show ? (
    <>
      {isIOS && (
        <div
          ref={pageDimRef}
          className={classNames(
            'absolute left-0 top-0 h-full w-full bg-[rgba(0,0,0,0.6)] opacity-60',
            {
              hidden: !showStackPageDim,
            },
          )}
        />
      )}

      <div
        key={navigationData[depth].url}
        ref={ref}
        className={classNames('stack-page-root h-full w-full', {
          hidden: isStackPageRouteHidden,
        })}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </>
  ) : null
}
