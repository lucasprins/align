import { AsyncState, Debounced, FormState } from '@align/core'

import { AuthenticationForeignMutationsExpected } from '../authentication.domain'
import { Co } from './_builder'

import { login } from './login'
import { loginFormSubmission } from './login-form-submission'
import { loginFormValidation } from './login-form-validation'
import { logout, logoutCleanup } from './logout'
import { workspaceUrlValidation } from './workspace-url-validation'

export const AuthenticationLoginRunner = Co.Template<AuthenticationForeignMutationsExpected>(login, {
  interval: 15,
  runFilter: (props) => AsyncState.isLoading(props.context.user.sync),
})

export const AuthenticationLogoutRunner = Co.Template<AuthenticationForeignMutationsExpected>(logout, {
  interval: 15,
  runFilter: (props) => AsyncState.isLoading(props.context.logout.sync),
})

export const AuthenticationLogoutCleanupRunner = Co.Template<AuthenticationForeignMutationsExpected>(logoutCleanup, {
  interval: 15,
  runFilter: (props) => AsyncState.isLoaded(props.context.logout.sync) && props.context.logout.sync.value === true,
})

export const AuthenticationValidateLoginFormRunner = Co.Template<AuthenticationForeignMutationsExpected>(
  loginFormValidation,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isValidating(props.context.loginForm),
  }
)

export const AuthenticationSubmitLoginFormRunner = Co.Template<AuthenticationForeignMutationsExpected>(
  loginFormSubmission,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isSubmitting(props.context.loginForm),
  }
)

export const AuthenticationWorkspaceUrlValidationRunner = Co.Template<AuthenticationForeignMutationsExpected>(
  workspaceUrlValidation,
  {
    interval: 10,
    runFilter: (props) => Debounced.Operations.shouldCoroutineRun(props.context.createWorkspaceForm.values.url),
  }
)
