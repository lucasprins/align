import * as SelectPrimitive from '@radix-ui/react-select'
import clsx from 'clsx'
import * as React from 'react'

import { SelectContentProps, SelectItemProps, SelectTriggerProps } from './select-props'

import { IconCheck, IconChevronSelectorVertical } from '../../icons'
import { Icon } from '../icon'

import './select.css'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Trigger>, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <span className="SelectTriggerWrapper">
      <SelectPrimitive.Trigger ref={ref} className={clsx('SelectTrigger', className)} {...props}>
        {children}

        <SelectPrimitive.Icon asChild>
          <Icon component={IconChevronSelectorVertical} className="SelectTriggerIcon" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </span>
  )
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Content>, SelectContentProps>(
  ({ className, children, position = 'item-aligned', ...props }, ref) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content ref={ref} className={clsx('SelectContent', className)} position={position} {...props}>
        <SelectPrimitive.Viewport className={clsx('SelectViewport')}>{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
)
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectItem = React.forwardRef<React.ElementRef<typeof SelectPrimitive.Item>, SelectItemProps>(
  ({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item ref={ref} className={clsx('SelectItem', className)} {...props}>
      <SelectPrimitive.ItemIndicator className="SelectItemIndicator">
        <Icon component={IconCheck} />
      </SelectPrimitive.ItemIndicator>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
)
SelectItem.displayName = SelectPrimitive.Item.displayName

export { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue }
