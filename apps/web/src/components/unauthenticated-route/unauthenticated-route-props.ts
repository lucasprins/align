import { User } from '@align/api-types'
import { AsyncState, Maybe } from '@align/core'

export interface UnauthenticatedRouteProps {
  user: AsyncState<Maybe<User>>
  redirectUrl: (user: User) => string
  children: React.ReactNode
}
