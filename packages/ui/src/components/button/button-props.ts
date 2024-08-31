import * as React from 'react'

import { IconComponentProps, SlottableComponent } from '../../types'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    SlottableComponent,
    ButtonIconProps {
  loading?: boolean
  variant?: ButtonVariant
  fullWidth?: boolean
}

export type ButtonVariant = 'dark__gray' | 'dark__white' | 'light' | 'accent' | 'outline'
// | 'zinc'
// | 'ghost'
// | 'success'
// | 'warning'
// | 'critical'

export type ButtonIconPosition = 'iconLeft' | 'iconRight'

type IconPosition = 'left' | 'right'

/**
 * @deprecated
 */
type ButtonIconProps = {
  [K in IconPosition as `icon${Capitalize<K>}`]?: {
    /**
     * @deprecated
     */
    component?: React.ElementType<IconComponentProps>
    /**
     * @deprecated
     */
    props?: IconComponentProps
  }
}
