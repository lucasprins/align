import React from 'react'
import clsx from 'clsx'

import { CardProps } from './card-props'

import './card.css'

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'secondary', children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={clsx('Card', { [`Card-${variant}`]: variant }, className)}>
        {children}
      </div>
    )
  }
)
Card.displayName = 'Card'
