import * as React from 'react'
import clsx from 'clsx'

import { LabelProps } from './label-props'

import './label.css'

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => {
  return <label {...props} ref={ref} className={clsx('Label', className)} />
})
Label.displayName = 'Label'
