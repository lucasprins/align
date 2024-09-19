import { RegisterPayload, RegistrationResult, User } from '@align/api-types'
import { View } from '@align/core-react'

import {
  ForeignMutationsInput,
  FormState,
  Maybe,
  propertyUpdater,
  replaceWith,
  Synchronized,
  Unit,
  Updater,
} from '@align/core'

export type Registration = {
  readonly form: FormState<RegisterForm>
  readonly result: Synchronized<RegisterPayload, Maybe<RegistrationResult>>
  readonly showPassword: boolean
}

export const Registration = {
  default: (): Registration => {
    return {
      form: FormState.Default.idle<RegisterForm>({ email: '', password: '', confirmPassword: '' }),
      result: Synchronized.Default({ email: '', password: '' }),
      showPassword: false,
    }
  },

  Updaters: {
    Core: {
      form: propertyUpdater<Registration>()('form'),
      result: propertyUpdater<Registration>()('result'),
      showPassword: propertyUpdater<Registration>()('showPassword'),
    },

    Template: {
      cleanup: (): Updater<Registration> => {
        return Updater<Registration>(replaceWith(Registration.default()))
      },
      validateForm: (): Updater<Registration> => {
        return Registration.Updaters.Core.form(FormState.Updaters.toValidating())
      },
    },
  },

  Operations: {
    isFormLoading: (context: Registration) => {
      return FormState.Assert.isValidating(context.form) || FormState.Assert.isSubmitting(context.form)
    },
    canSubmitForm: (context: Registration) => {
      return !Registration.Operations.isFormLoading(context) && context.form.isDirty
    },
  },

  ForeignMutations: (input: ForeignMutationsInput<RegistrationReadOnlyContext, RegistrationWriteableState>) => ({}),
}

export type RegistrationForeignMutationsExpected = {
  login: (user: User) => void
}

export type RegistrationForeignMutationsExposed = ReturnType<typeof Registration.ForeignMutations>

export type RegistrationReadOnlyContext = Unit
export type RegistrationWriteableState = Registration

export type RegistrationView = View<
  RegistrationReadOnlyContext & RegistrationWriteableState,
  RegistrationWriteableState,
  RegistrationForeignMutationsExpected,
  {}
>

export type RegisterForm = {
  email: string
  password: string
  confirmPassword: string
}
