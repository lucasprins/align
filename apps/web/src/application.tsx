import { unit } from '@align/core'
import { Route } from '@align/core-react'
import React from 'react'

import { Authentication } from '@domains/authentication/authentication.domain'
import { CreateWorkspace } from '@domains/authentication/views/CreateWorkspace'
import { Login } from '@domains/authentication/views/Login'
import { Register } from '@domains/authentication/views/Register'

export const Application = () => {
  const [authentication, setAuthentication] = React.useState(Authentication.Default())

  const authenticationForeignMutations = React.useMemo(() => {
    return Authentication.ForeignMutations({ context: authentication, setState: setAuthentication })
  }, [authentication, setAuthentication])

  return (
    <>
      <Route
        path="/login"
        component={(params) => <Login context={authentication} setState={setAuthentication} foreignMutations={unit} />}
      />
      <Route path="/sign-up" component={Register} />
      <Route path="/create-workspace" component={CreateWorkspace} />
    </>
  )
}
