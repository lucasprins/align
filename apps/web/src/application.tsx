import { User } from '@align/api-types'
import { unit } from '@align/core'
import React from 'react'
import { Route, Router, Switch } from 'wouter'

import { Authentication } from '@domains/authentication/authentication.domain'
import { CreateWorkspace } from '@domains/authentication/views/create-workspace/create-workspace'
import { Login } from '@domains/authentication/views/login/login'
import { Register } from '@domains/authentication/views/register/register'
import { ApplicationLayout } from './components/application-layout/application-layout'
import { ApplicationLayoutProps } from './components/application-layout/application-layout-props'
import AuthenticatedRoute from './components/authenticated-route/authenticated-route'
import { AuthenticationTemplate } from './domains/authentication/authentication.template'

import {
  AuthenticationLoginRunner,
  AuthenticationLogoutCleanupRunner,
  AuthenticationLogoutRunner,
} from './domains/authentication/coroutines/_runners'

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
          {/* Authentication */}
          <Route path="/login">
            {(params) => (
              <AuthenticationTemplate
                context={authentication}
                setState={setAuthentication}
                foreignMutations={unit}
                view={Login}
              />
            )}
          </Route>

          <Route path="/sign-up">
            {() => (
              <AuthenticationTemplate
                context={authentication}
                setState={setAuthentication}
                foreignMutations={unit}
                view={Register}
              />
            )}
          </Route>

          <Route path="/create-workspace">
            {() => (
              // TODO? : Split into subdomain of workspaces instead of auth
              <AuthenticationTemplate
                context={authentication}
                setState={setAuthentication}
                foreignMutations={unit}
                view={CreateWorkspace}
              />
            )}
          </Route>

          <Route path="/:workspace/inbox">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/issues">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/projects">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/cycles">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>

          <Route path="/:workspace/teams">
            {(params) => (
              <AuthenticatedRoute user={authentication.user.sync}>
                {(user) => (
                  <ApplicationLayout {...getApplicationLayoutProps(params.workspace, user)}></ApplicationLayout>
                )}
              </AuthenticatedRoute>
            )}
          </Route>
        </Switch>
      </Router>
    </>
  )
}
