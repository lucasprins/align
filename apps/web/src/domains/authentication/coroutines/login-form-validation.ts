import { defineFormResolver, FormErrors, FormState } from '@align/core'

import { Authentication } from '../authentication.domain'
import { Co } from './_builder'
import { LoginForm } from '../authentication.types'

const loginFormResolver = defineFormResolver<LoginForm>((values) => {
  const errors: FormErrors<LoginForm> = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return { errors }
})

export const loginFormValidation = Co.GetState().then((state) => {
  const { errors } = loginFormResolver(state.loginForm.values)

  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toInvalid<LoginForm>(errors)))
  } else {
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitting()))
  }
})
