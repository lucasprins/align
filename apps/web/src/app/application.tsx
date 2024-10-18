import { User } from '@align/api-types'
import { AsyncState, Maybe, unit } from '@align/core'
import React from 'react'
import { Redirect, Route, Router, Switch } from 'wouter'

import {
  AuthenticationLoginRunner,
  AuthenticationLogoutCleanupRunner,
  AuthenticationLogoutRunner,
} from '#/domains/authentication/coroutines/_runners'

import { ApplicationLayout } from '#/components/application-layout/application-layout'
import { ApplicationLayoutProps } from '#/components/application-layout/application-layout-props'
import AuthenticatedRoute from '#/components/authenticated-route/authenticated-route'
import UnauthenticatedRoute from '#/components/unauthenticated-route/unauthenticated-route'
import { Authentication } from '#/domains/authentication/authentication.domain'
import { AuthenticationTemplate } from '#/domains/authentication/authentication.template'
import { RegistrationTemplateEmbedded } from '#/domains/authentication/domains/registration/registration.template'
import { SignUp } from '#/domains/authentication/domains/registration/views/sign-up'
import { WorkspaceCreationTemplateEmbedded } from '#/domains/authentication/domains/workspace-creation/template'
import CreateWorkspace from '#/domains/authentication/domains/workspace-creation/views/create-workspace/create-workspace'
import { Login } from '#/domains/authentication/views/login/login'
import { getWorkspaceRedirectUrl } from '#/lib/user'
import PageNotFound from './404'
import { routes } from '#/lib/routes'

export const Application = () => {
  const [authentication, setAuthentication] = React.useState(Authentication.Default())

  const authenticationForeignMutations = React.useMemo(() => {
    return Authentication.ForeignMutations({ context: authentication, setState: setAuthentication })
  }, [authentication, setAuthentication])

  const getApplicationLayoutProps = React.useCallback(
    (workspace: string, user: User): ApplicationLayoutProps => {
      return {
        workspace,
        user,
        handleLogout: () => setAuthentication(Authentication.Updaters.Template.logout()),
      }
    },
    [authentication]
  )

  console.log('authentication', authentication)

  return (
    <>
      <AuthenticationLoginRunner
        context={authentication}
        setState={setAuthentication}
        foreignMutations={unit}
        view={unit}
      />

      <AuthenticationLogoutRunner
        context={authentication}
        setState={setAuthentication}
        foreignMutations={unit}
        view={unit}
      />

      <AuthenticationLogoutCleanupRunner
        context={authentication}
        setState={setAuthentication}
        foreignMutations={unit}
        view={unit}
      />

      <Router>
        <Switch>
          <Route path="/">
            {() => {
              if (AsyncState.isLoaded(authentication.user.sync) && Maybe.isJust(authentication.user.sync.value)) {
                return <Redirect to={getWorkspaceRedirectUrl(authentication.user.sync.value.value)} />
              } else {
                return <Redirect to={routes.auth.login} />
              }
            }}
          </Route>

          <Route path="/login">
            {() => (
              <UnauthenticatedRoute user={authentication.user.sync} redirectUrl={getWorkspaceRedirectUrl}>
                <AuthenticationTemplate
                  context={authentication}
                  setState={setAuthentication}
                  foreignMutations={unit}
                  view={Login}
                />
              </UnauthenticatedRoute>
            )}
          </Route>

          <Route path="/sign-up">
            {() => (
              <UnauthenticatedRoute user={authentication.user.sync} redirectUrl={getWorkspaceRedirectUrl}>
                <RegistrationTemplateEmbedded
                  context={authentication}
                  setState={setAuthentication}
                  foreignMutations={{ login: authenticationForeignMutations.login }}
                  view={SignUp}
                />
              </UnauthenticatedRoute>
            )}
          </Route>

          <Route path="/create-workspace">
            {() => (
              <WorkspaceCreationTemplateEmbedded
                view={CreateWorkspace}
                context={authentication}
                setState={setAuthentication}
                foreignMutations={{
                  login: authenticationForeignMutations.login,
                  logout: authenticationForeignMutations.logout,
                }}
              />
            )}
          </Route>

          <Route path="/:workspace/inbox/*?">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync} workspaceUrl={params.workspace}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/issues/*?">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync} workspaceUrl={params.workspace}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/projects/*?">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync} workspaceUrl={params.workspace}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/cycles/*?">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync} workspaceUrl={params.workspace}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/teams/*?">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync} workspaceUrl={params.workspace}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route>
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  )
}
