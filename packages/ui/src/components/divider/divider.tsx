import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import clsx from 'clsx'

import { DividerProps } from './divider-props'

import './divider.css'

export const Divider = React.forwardRef<React.ElementRef<typeof SeparatorPrimitive.Root>, DividerProps>(
  ({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={clsx('Divider', className)}
      {...props}
    />
  )
)
Divider.displayName = 'Divider'
