import { Link } from '@align/core-react'
import clsx from 'clsx'
import React from 'react'

import { TextLinkProps } from './text-link-props'

import './text-link.css'

export const TextLink = React.forwardRef<React.ElementRef<typeof Link>, TextLinkProps>(
  ({ className, ...props }, ref) => <Link {...props} ref={ref} className={clsx('TextLink', className)} />
)
TextLink.displayName = 'TextLink'
