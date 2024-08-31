import React from 'react'
import clsx from 'clsx'

import { IconProps } from './icon-props'

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ component: Component, className, ...props }, ref) => {
  return <Component {...props} ref={ref} className={clsx('Icon', className)} />
})
Icon.displayName = 'Icon'
