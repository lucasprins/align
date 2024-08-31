import React from 'react'
import clsx from 'clsx'

import { HeadingProps } from './heading-props'

import './heading.css'

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ as, size = 1, className, ...props }, ref) => {
    const Component = as ?? 'h1'

    return <Component {...props} ref={ref} className={clsx('Heading', { [`Heading--${size}`]: size }, className)} />
  }
)
Heading.displayName = 'Text'
