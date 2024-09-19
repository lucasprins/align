import { defineFormResolver, FormErrors, FormState } from '@align/core'

import { RegisterForm, Registration } from '../registration.domain'
import { Co } from './_builder'

const registerFormResolver = defineFormResolver<RegisterForm>((values) => {
  const errors: FormErrors<RegisterForm> = {}

  if (!values.email) {
    errors.email = 'Email is required'
  }

  if (!values.password) {
    errors.password = 'Password is required'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Password confirmation is required'
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = 'Password confirmation does not match password'
  }

  return { errors }
})

export const registerFormValidation = Co.GetState().then((state) => {
  const { errors } = registerFormResolver(state.form.values)

  if (Object.keys(errors).length > 0) {
    return Co.SetState(Registration.Updaters.Core.form(FormState.Updaters.toInvalid<RegisterForm>(errors)))
  } else {
    return Co.SetState(Registration.Updaters.Core.form(FormState.Updaters.toSubmitting()))
  }
})
