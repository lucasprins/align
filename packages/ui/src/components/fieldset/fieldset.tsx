import clsx from 'clsx'
import * as React from 'react'

import { FieldDescriptionProps, FieldErrorProps, FieldGroupProps, FieldProps, FieldsetProps } from './fieldset-props'

import './fieldset.css'

export const Fieldset = React.forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <fieldset {...props} ref={ref} className={clsx('Fieldset', className)}>
        {children}
      </fieldset>
    )
  }
)
Fieldset.displayName = 'Fieldset'

export const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={clsx('FieldGroup', className)}>
        {children}
      </div>
    )
  }
)
FieldGroup.displayName = 'FieldGroup'

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(({ children, className, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={clsx('Field', className)}>
      {children}
    </div>
  )
})
Field.displayName = 'Field'

export const FieldDescription = React.forwardRef<HTMLParagraphElement, FieldDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p {...props} ref={ref} className={clsx('FieldDescription', className)}>
        {children}
      </p>
    )
  }
)
FieldDescription.displayName = 'FieldDescription'

export const FieldError = React.forwardRef<HTMLParagraphElement, FieldErrorProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p {...props} ref={ref} className={clsx('FieldError', className)}>
        {children}
      </p>
    )
  }
)
FieldError.displayName = 'FieldDescription'
