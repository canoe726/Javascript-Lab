export type Size = 'large' | 'default' | 'small'
export type Theme = 'gray' | 'primary' | 'secondary'
export type Placement = 'top' | 'right' | 'bottom' | 'left'

export interface ComponentMetaMap {
  size: {
    [_ in Size]: string
  }
  theme: {
    [_ in Theme]: string
  }
}

export const ComponentMetaBaseMap: ComponentMetaMap = {
  size: {
    small: '',
    default: '',
    large: '',
  },
  theme: {
    gray: '',
    primary: '',
    secondary: '',
  },
}
