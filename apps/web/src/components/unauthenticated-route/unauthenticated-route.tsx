import { AsyncState, Maybe } from '@align/core'
import { Redirect } from 'wouter'

import { routes } from '@/lib/routes'
import LoadingScreen from '../loading-screen/loading-screen'
import { UnauthenticatedRouteProps } from './unauthenticated-route-props'

export default function UnauthenticatedRoute({ user, redirectUrl, children }: UnauthenticatedRouteProps) {
  if (AsyncState.isLoaded(user) && Maybe.isJust(user.value)) {
    return <Redirect to={redirectUrl(user.value.value)} />
  }

  if (AsyncState.isLoading(user)) {
    return <LoadingScreen />
  }

  if (AsyncState.isFailed(user)) {
    return <Redirect to={routes.auth.login} />
  }

  return children
}
