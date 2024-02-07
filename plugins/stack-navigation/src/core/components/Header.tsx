import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useAppRouter } from '../StackNavigation/useAppRouter'
import { ComponentCommonProps } from './interface/common.interface'

const iconInfoMap = {
  className: 'z-10 ',
  size: '24',
}

export interface HeaderProps extends ComponentCommonProps {
  title: string
  titleClassname?: string
  fallback?: {
    prev?: string
  }
  isTopSticky?: boolean
  disableStickyStyle?: boolean
  scrollY?: number
  left?: {
    showMenuIcon?: boolean
    showHomeIcon?: boolean
    showArrowLeftIcon?: boolean
    onMenuIconClick?: () => void
    onHomeIconClick?: () => void
    onArrowLeftIconClick?: () => void
  }
  right?: {
    showSearchIcon?: boolean
    showRefreshIcon?: boolean
    showFilterIcon?: boolean
    onRefreshIconClick?: () => void
  }
}

export default function Header({
  className,
  style,
  title,
  titleClassname,
  fallback,
  isTopSticky,
  disableStickyStyle,
  left,
  right,
}: HeaderProps) {
  const appRouter = useAppRouter()

  const headerRef = useRef<HTMLDivElement>(null)

  const [scrollYPosition, setScrollYPosition] = useState(0)

  const handleBackIconClick = () => {
    if (window.history.length <= 1) {
      appRouter.replace(fallback?.prev ?? '/')
    } else {
      appRouter.pop()
    }
  }

  useEffect(() => {
    const handleSiblingScrollEvent = (event: Event) => {
      const target = event.target as HTMLElement

      setScrollYPosition(target.scrollTop)
    }

    if (headerRef.current) {
      const nextSibling = headerRef.current.nextSibling as HTMLElement
      nextSibling.addEventListener('scroll', handleSiblingScrollEvent)
    }

    return () => {
      if (headerRef.current) {
        const nextSibling = headerRef.current.nextSibling as HTMLElement
        nextSibling.removeEventListener('scroll', handleSiblingScrollEvent)
      }
    }
  }, [])

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    metaThemeColor && metaThemeColor.setAttribute('content', style?.backgroundColor ?? '#FFFFFF')
  }, [window.location.href, style?.backgroundColor])

  return (
    <header
      ref={headerRef}
      className={classNames(
        'relative z-[999] flex h-[4.4rem] w-full items-center justify-between bg-white px-[1.6rem] py-[1rem] text-text_01',
        {
          'sticky left-0 top-0': isTopSticky,
        },
        className,
      )}
      style={{
        ...style,
        boxShadow:
          !disableStickyStyle && isTopSticky && scrollYPosition > 0
            ? '0 1px 0px 0 rgb(0 0 0 / 0.05)'
            : '',
      }}
    >
      <div className="flex cursor-default items-center justify-center gap-x-[1.6rem]" role="button">
        {left?.showMenuIcon && (
          <Menu
            fill="#333333"
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
            onClick={() => {
              if (left?.onMenuIconClick) {
                left.onMenuIconClick()
              }
            }}
          />
        )}
        {left?.showHomeIcon && (
          <ArrowLeft
            fill="#333333"
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
            onClick={() => {
              if (left?.onHomeIconClick !== undefined) {
                left.onHomeIconClick()
              }
            }}
          />
        )}
        {left?.showArrowLeftIcon && (
          <ArrowLeft
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
            onClick={() => {
              if (left?.onArrowLeftIconClick === undefined) {
                handleBackIconClick()
              } else {
                left.onArrowLeftIconClick()
              }
            }}
          />
        )}
      </div>

      <h1
        className={classNames(
          'absolute left-[50%] top-[50%] line-clamp-1 w-[75%] translate-x-[-50%] translate-y-[-50%] text-center',
          {
            'text-subhead-4m': !titleClassname,
          },
          titleClassname,
        )}
      >
        {title}
      </h1>

      <div className="flex items-center justify-center gap-x-[1.6rem]">
        {right?.showSearchIcon && (
          <Search
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
          />
        )}
        {right?.showRefreshIcon && (
          <EditRefresh
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
            onClick={right?.onRefreshIconClick}
          />
        )}
        {right?.showFilterIcon && (
          <Filter
            className={iconInfoMap.className}
            width={iconInfoMap.size}
            height={iconInfoMap.size}
          />
        )}
      </div>
    </header>
  )
}
