import clsx from 'clsx'
import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { SwitchProps } from './switch-props'

import './switch.css'

export const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, ...props }, ref) => (
    <SwitchPrimitives.Root className={clsx('SwitchRoot', className)} {...props} ref={ref}>
      <SwitchPrimitives.Thumb className={'SwitchThumb'} />
    </SwitchPrimitives.Root>
  )
)
Switch.displayName = SwitchPrimitives.Root.displayName
