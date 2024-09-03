import { AuthenticationForeignMutationsExpected } from '../authentication.domain'

import { Co } from './_builder'
import { validateLoginForm } from './validate-login-form'
// import { getUserQuery } from './getUser'

// export const AuthenticationGetUserRunner = Co.Template<AuthenticationForeignMutationsExpected>(getUserQuery, {
//   interval: 5,
//   runFilter: (props) => props.context.user.response.kind === 'loading',
// })

export const AuthenticationValidateLoginFormRunner = Co.Template<AuthenticationForeignMutationsExpected>(
  validateLoginForm,
  {
    interval: 15,
    runFilter: (props) => props.context.loginForm.kind === 'submitting',
  }
)
