import React from 'react'

import { useRouter } from './useRouter'

export interface RedirectProps {
  href: string
}

export const Redirect = ({ href }: RedirectProps) => {
  const { navigate } = useRouter()

  React.useLayoutEffect(() => {
    navigate(href)
  }, [])

  return null
}
