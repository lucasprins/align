import React from 'react'

export type RouterContext = {
  path: string
  searchParams: URLSearchParams
  navigate: (path: string) => void
}

export const RouterContext = React.createContext<RouterContext | undefined>(undefined)

export type RouterProviderProps = {
  children: React.ReactNode
}

export function RouterProvider({ children }: RouterProviderProps) {
  const [path, setPath] = React.useState(window.location.pathname)
  const [searchParams, setSearchParams] = React.useState(new URLSearchParams(window.location.search))

  const navigate = React.useCallback(
    (to: string) => {
      setPath(to)
      setSearchParams(new URLSearchParams(window.location.search))

      console.log('to', to)
      window.history.pushState({}, '', to)
      window.dispatchEvent(new Event('popstate'))
    },
    [path, setPath, setSearchParams]
  )

  React.useEffect(() => {
    const onLocationChange = (e: PopStateEvent) => {
      setPath(window.location.pathname)
      setSearchParams(new URLSearchParams(window.location.search))
    }

    window.addEventListener('popstate', onLocationChange)

    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
  }, [])

  return <RouterContext.Provider value={{ path, searchParams, navigate }}>{children}</RouterContext.Provider>
}
