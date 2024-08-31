import React from 'react'
import clsx from 'clsx'

import { TextProps } from './text-props'

import './text.css'

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(({ className, ...props }, ref) => (
  <p {...props} ref={ref} className={clsx('Text', className)} />
))
Text.displayName = 'Text'
