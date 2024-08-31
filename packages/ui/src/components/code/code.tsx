import React from 'react'
import clsx from 'clsx'

import { CodeProps } from './code-props'

import './code.css'

export const Code = React.forwardRef<HTMLElement, CodeProps>(({ className, ...props }, ref) => (
  <code {...props} ref={ref} className={clsx('Code', className)} />
))
Code.displayName = 'Code'
