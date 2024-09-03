import clsx from 'clsx'

import { AuthFullscreenProps } from './auth-full-screen-props'

import './auth-full-screen.css'

export function AuthFullscreen({ children, className, ...props }: AuthFullscreenProps) {
  return (
    <main {...props} className={clsx('AuthFullscreen', className)}>
      {children}
    </main>
  )
}
