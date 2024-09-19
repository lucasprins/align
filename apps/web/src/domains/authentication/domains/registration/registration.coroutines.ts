import { AsyncState, FormState } from '@align/core'

import { Co } from './coroutines/_builder'
import { register } from './coroutines/register'
import { registerFormSubmission } from './coroutines/register-form-submission'
import { registerFormValidation } from './coroutines/register-form-validation'
import { RegistrationForeignMutationsExpected } from './registration.domain'

export const RegistrationRegisterRunner = Co.Template<RegistrationForeignMutationsExpected>(register, {
  interval: 15,
  runFilter: (props) => AsyncState.isLoading(props.context.result.sync),
})

export const RegistrationValidateRegisterFormRunner = Co.Template<RegistrationForeignMutationsExpected>(
  registerFormValidation,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isValidating(props.context.form),
  }
)

export const RegistrationSubmitRegisterFormRunner = Co.Template<RegistrationForeignMutationsExpected>(
  registerFormSubmission,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isSubmitting(props.context.form),
  }
)
