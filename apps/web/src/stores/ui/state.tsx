import { User } from '@align/api-types'
import { Maybe } from '@align/core'
import * as React from 'react'

import { UIStoreAction } from './actions'
import { uiStoreReducer } from './reducer'

export type Language = 'en_US' | 'nl_NL'
export type Theme = 'light' | 'dark'

export type Session = {
  user: Maybe<User>
}

export type UIStore = {
  readonly language: Language
  readonly theme: Theme
  readonly session: Session
}

const UIStoreContext = React.createContext<UIStore | null>(null)
const UIStoreDispatchContext = React.createContext<React.Dispatch<UIStoreAction> | null>(null)

function createInitialState({}): UIStore {
  return {
    language: 'en_US',
    theme: 'dark',
    session: {
      user: Maybe.nothing(),
    },
  }
}

export function UIStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(uiStoreReducer, {}, createInitialState)

  return (
    <UIStoreContext.Provider value={state}>
      <UIStoreDispatchContext.Provider value={dispatch}>{children}</UIStoreDispatchContext.Provider>
    </UIStoreContext.Provider>
  )
}

export function useUiStore() {
  const context = React.useContext(UIStoreContext)
  if (!context) throw new Error('You can only use useUiStore from within UIStoreProvider')
  return context
}

export function useUiStoreDispatch() {
  const context = React.useContext(UIStoreDispatchContext)
  if (!context) throw new Error('You can only use useUiStoreDispatch from within UIStoreProvider')
  return context
}
