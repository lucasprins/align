import { FormState } from '@align/core'

import { Authentication } from '../authentication.domain'
import { Co } from './_builder'
import { LoginForm } from '../authentication.types'

type Resolver<T> = (values: T) => {
  errors: {
    [K in keyof T]?: string
  }
}

const resolver: Resolver<LoginForm> = (values) => {
  const errors: { [K in keyof LoginForm]?: string } = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  return { errors }
}

export const loginFormValidation = Co.GetState().then((state) => {
  const { errors } = resolver(state.loginForm.values)

  console.log(errors)

  if (Object.keys(errors).length > 0) {
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toInvalid<LoginForm>(errors)))
  } else {
    return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitting()))
  }
})
