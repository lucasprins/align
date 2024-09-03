import { FormState } from '@align/core'

import { Authentication, LoginForm } from '../authentication.domain'
import { Co } from './_builder'

// TODO : abstract into FormStateValidator Coroutine
export const validateLoginForm = Co.GetState().then((state) => {
  const values = state.loginForm.values
  const errors: { [K in keyof LoginForm]?: string } = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (Object.keys(errors).length > 0) {
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toInvalid<LoginForm>(errors)))
  } else {
    // todo : add submit handler that has access to the state, can update the state?? OR -> use another coroutine that handles the loginform submissions using synchronize
    //        that has a runFilter on formState.isValidated, might make more sense. That coroutine should probably also cleanup the loginFormState if neccessary.
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitted()))
  }
})
