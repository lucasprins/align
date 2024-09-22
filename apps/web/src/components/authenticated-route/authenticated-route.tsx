import { AsyncState, Maybe } from '@align/core'
import React from 'react'
import { Redirect } from 'wouter'

import { routes } from '#/lib/routes'
import { canAccessWorkspace } from '#/lib/user'
import AccessDenied from '../access-denied/access-denied'
import LoadingScreen from '../loading-screen/loading-screen'
import { AuthenticatedRouteProps } from './authenticated-route-props'

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({ user, workspaceUrl, children }) => {
  if (AsyncState.isLoaded(user) && Maybe.isJust(user.value)) {
    // TODO : Add server-side check
    if (canAccessWorkspace(workspaceUrl, user.value.value)) {
      return children(user.value.value)
    } else {
      return <AccessDenied />
    }
  }

  if (AsyncState.isLoading(user)) {
    return <LoadingScreen />
  }

  if (AsyncState.isFailed(user)) {
    return <Redirect to={routes.auth.login} />
  }

  return <Redirect to={routes.auth.login} />
}

export default AuthenticatedRoute
