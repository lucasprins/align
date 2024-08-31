import { ReactNode, useState, useCallback, createContext, useContext } from 'react'

const themes = ['light', 'dark'] as const

export type Theme = (typeof themes)[number]

export type ThemeContext = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContext>({} as ThemeContext)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  const setThemeInternal = useCallback((theme: Theme) => {
    console.log("setThemeInternal")

    const rootElement = document.documentElement

    setTheme(theme)
    localStorage.setItem('theme', theme)

    rootElement.classList.add('disable-transitions')
    rootElement.setAttribute('data-theme', theme)

    setTimeout(() => {
      rootElement.classList.remove('disable-transitions')
    }, 50)
  }, [])

  return <ThemeContext.Provider value={{ theme, setTheme: setThemeInternal }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

export function getInitialTheme(): Theme {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    return 'dark'
  } else {
    return 'light'
  }
}
