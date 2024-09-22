import { Debounced, Synchronized, Value } from '@align/core'

export type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}