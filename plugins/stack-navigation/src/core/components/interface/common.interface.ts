import type { CSSProperties } from 'react'

import type { BadgeTheme } from '@/stories/baseComponents/Badge/Badge'

export interface ComponentCommonProps {
  className?: string
  style?: CSSProperties
}

export type BadgePropsMap<T extends string> = {
  [_ in T]: {
    text: string
    theme: BadgeTheme
  }
}
