import * as React from 'react'
import clsx from 'clsx'

import { InputProps } from './input-props'

import './input.css'

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ invalid = false, className, ...props }, ref) => {
  return (
    <span className="InputRoot">
      <input {...props} className={clsx('Input', className)} ref={ref} data-invalid={invalid || undefined} />
    </span>
  )
})
Input.displayName = 'Input'
