import { Debounced, Synchronized, Value } from '@align/core'

export type WorkspaceCreationForm = {
  name: string
  url: Debounced<Synchronized<Value<string>, boolean>>
  companySize: string
  role: string
}

export type WorkspaceUrlAvailability = 'unknown' | 'available' | 'taken'
