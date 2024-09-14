import { AsyncState, Maybe } from '@align/core'
import { Redirect } from 'wouter'

import { routes } from '@/lib/routes'
import LoadingScreen from '../loading-screen/loading-screen'
import { AuthenticatedRouteProps } from './authenticated-route-props'

export default function AuthenticatedRoute({ user, children }: AuthenticatedRouteProps) {
  if (AsyncState.isLoaded(user) && Maybe.isJust(user.value)) {
    // TODO ? Add check to see if the workspace is accessible?
    return children(user.value.value)
  }

  if (AsyncState.isLoading(user)) {
    return <LoadingScreen />
  }

  if (AsyncState.isFailed(user)) {
    return <Redirect to={routes.login} />
  }

  return <Redirect to={routes.login} />
}
