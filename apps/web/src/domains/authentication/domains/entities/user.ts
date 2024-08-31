import { id, propertyUpdater } from '@align/core'

export type User = {
  id: string
  username: string
}

export const User = {
  Default: id,

  Updaters: {
    Core: {
      id: propertyUpdater<User>()('id'),
      username: propertyUpdater<User>()('username'),
    },
  },
}
