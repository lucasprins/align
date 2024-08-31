import { Slot, Slottable } from '@radix-ui/react-slot'
import clsx from 'clsx'
import * as React from 'react'

import { ButtonProps } from './button-props'
import { IconSpinner } from '../../icons'
import { IconComponentProps } from '../../types'

import './button.css'

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      asChild = false,
      loading,
      variant = 'dark__white',
      fullWidth,
      children,
      className,
      iconLeft,
      iconRight,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        {...props}
        ref={ref}
        className={clsx('Button', { [`Button--${variant}`]: variant }, { loading }, { fullWidth }, className)}
        disabled={disabled || loading}
      >
        {loading && <IconSpinner className="ButtonSpinner" />}

        {renderIcon(iconLeft?.component, iconLeft?.props)}
        <Slottable>{children}</Slottable>
        {renderIcon(iconRight?.component, iconRight?.props)}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

const renderIcon = (Icon: React.ElementType<IconComponentProps> | undefined, props?: IconComponentProps) =>
  Icon && <Icon {...props} className={clsx('ButtonIcon', props?.className)} />
