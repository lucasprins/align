import { unit } from '@align/core'
import React from 'react'
import { Route, Router, Switch } from 'wouter'

import { Authentication } from '@domains/authentication/authentication.domain'
import { CreateWorkspace } from '@domains/authentication/views/create-workspace/create-workspace'
import { Login } from '@domains/authentication/views/login/login'
import { Register } from '@domains/authentication/views/register/register'
import { AuthenticationTemplate } from './domains/authentication/authentication.template'

export const Application = () => {
  const [authentication, setAuthentication] = React.useState(Authentication.Default())

  const authenticationForeignMutations = React.useMemo(() => {
    return Authentication.ForeignMutations({ context: authentication, setState: setAuthentication })
  }, [authentication, setAuthentication])

  return (
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
          {(params) => (
            <AuthenticationTemplate
              context={authentication}
              setState={setAuthentication}
              foreignMutations={unit}
              view={Register}
            />
          )}
        </Route>

        <Route path="/create-workspace">
          {(params) => (
            // TODO? : Split into subdomain of auth?
            <AuthenticationTemplate
              context={authentication}
              setState={setAuthentication}
              foreignMutations={unit}
              view={CreateWorkspace}
            />
          )}
        </Route>

        {/* Main */}
        {/* TODO : make components for this to handle redirect there */}
        {/* <Route path="/:workspace">{(params) => <Redirect to={`/${params.workspace}/inbox`} />}</Route>

        <Route
          path="/:workspace/inbox"
          component={(params) => {
            console.log('params', params)
            return <p>WorkspaceInbox</p>
          }}
        /> */}
      </Switch>
    </Router>
  )
}
