import type { CSSProperties, TouchEvent, UIEvent } from 'react'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { isIOS } from 'react-device-detect'
import Header, { HeaderProps } from '../components/Header'

export interface AppBarProps {
  headerProps: HeaderProps
  children: JSX.Element
  sectionStyle?: CSSProperties
  onScroll?: (event: UIEvent<HTMLDivElement>) => void
}

export default function AppBar({ headerProps, sectionStyle, children, onScroll }: AppBarProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  const [pageTransitionTrigger, setPageTransitionTrigger] = useState(false)

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const { clientX, clientY } = event.touches[0]
    const windowWidth = window.document.body.clientWidth

    const threshold = clientX / windowWidth
    if (threshold <= 0.1 && clientY >= 45 && isIOS) {
      setPageTransitionTrigger(true)
    }
  }

  const handleTouchEnd = () => {
    setPageTransitionTrigger(false)
  }

  useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.scrollTo(0, 0)
    }
  }, [])

  return (
    <main className="relative h-full w-full overflow-hidden">
      <Header {...headerProps} />

      <section
        ref={sectionRef}
        className={classNames('h-[calc(100%-4.4rem)] w-full', {
          'overflow-y-hidden': pageTransitionTrigger,
          'overflow-y-auto': !pageTransitionTrigger,
        })}
        style={sectionStyle}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={onScroll}
      >
        {children}
      </section>
    </main>
  )
}
