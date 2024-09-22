import React from 'react'
import clsx from 'clsx'

import { TextProps } from './text-props'

import './text.css'

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(({ className, align, ...props }, ref) => (
  <p {...props} ref={ref} className={clsx('Text', { [`text-${align}`]: align }, className)} />
))
Text.displayName = 'Text'
