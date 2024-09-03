import React from 'react'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

import { FlexProps } from './flex-props'

import './flex.css'

export const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ asChild, display, direction, align, justify, wrap, gap, rowGap, columnGap, className, ...props }, ref) => {
    const Component = asChild ? Slot : 'div'

    return (
      <Component
        {...props}
        ref={ref}
        className={clsx(
          'Flex',
          {
            [`display-${display}`]: display,
            [`direction-${direction}`]: direction,
            [`align-${align}`]: align,
            [`justify-${justify}`]: justify,
            [`wrap-${wrap}`]: wrap,
            [`gap-${gap}`]: gap,
            [`rowGap-${rowGap}`]: rowGap,
            [`columnGap-${columnGap}`]: columnGap,
          },
          className
        )}
      />
    )
  }
)
Flex.displayName = 'Flex'

export const Stack = React.forwardRef<
  React.ElementRef<typeof Flex>,
  Omit<React.ComponentPropsWithoutRef<typeof Flex>, 'direction'>
>(({ ...props }, ref) => {
  return <Flex {...props} ref={ref} direction="column" />
})
Stack.displayName = 'Stack'
