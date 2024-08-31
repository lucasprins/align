import React from 'react'
import clsx from 'clsx'

import { StrongProps } from './strong-props'

import './strong.css'

export const Strong = React.forwardRef<HTMLElement, StrongProps>(({ className, ...props }, ref) => (
  <strong {...props} ref={ref} className={clsx('Strong', className)} />
))
Strong.displayName = 'Strong'
