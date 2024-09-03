import clsx from 'clsx'
import React from 'react'

import { filterOutLayoutProps, getLayoutClsxObject } from '../../utils/layout-props'
import { BoxProps } from './box-props'

import './box.css'

export const Box = React.forwardRef<HTMLElement, BoxProps>(({ as = 'div', display, className, ...props }, ref) => {
  const { layoutProps, rest } = filterOutLayoutProps(props)
  const Component = as

  return (
    <Component
      {...rest}
      // @ts-ignore
      ref={ref}
      className={clsx(
        'Box',
        {
          ...getLayoutClsxObject(layoutProps),
          [`display-${display}`]: display,
        },
        className
      )}
    />
  )
})
Box.displayName = 'Box'
