import { Debounced, Synchronized, Value } from '@align/core'

export type LoginForm = {
  email: string
  password: string
  rememberMe: boolean
}

export type CreateWorkspaceForm = {
  name: string
  url: Debounced<Synchronized<Value<string>, boolean>>
  companySize: string
  role: string
}
