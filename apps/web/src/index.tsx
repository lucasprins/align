import { RouterProvider } from '@align/core-react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from '@lib/theme'
import { Application } from './application'

import '@align/ui/dist/esm/static/css/index.css'
import './styles/index.css'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl)
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <RouterProvider>
          <Application />
        </RouterProvider>
      </ThemeProvider>
    </React.StrictMode>
  )
}
