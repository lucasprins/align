import { User } from '@align/api-types'
import { AsyncState, Maybe } from '@align/core'

export interface AuthenticatedRouteProps {
  user: AsyncState<Maybe<User>>
  workspaceUrl: string
  children: (user: User) => React.ReactNode
}
