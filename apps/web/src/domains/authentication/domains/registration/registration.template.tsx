import { Template } from '@align/core-react'

import {
  RegistrationForeignMutationsExpected,
  RegistrationReadOnlyContext,
  RegistrationView,
  RegistrationWriteableState,
} from './registration.domain'

import {
  Authentication,
  AuthenticationReadOnlyContext,
  AuthenticationWriteableState,
} from '../../authentication.domain'

import {
  RegistrationRegisterRunner,
  RegistrationSubmitRegisterFormRunner,
  RegistrationValidateRegisterFormRunner,
} from './registration.coroutines'

export const RegistrationTemplate = Template.Default<
  RegistrationReadOnlyContext,
  RegistrationWriteableState,
  RegistrationForeignMutationsExpected,
  RegistrationView
>((props) => {
  return <props.view {...props} />
}).any([RegistrationRegisterRunner, RegistrationValidateRegisterFormRunner, RegistrationSubmitRegisterFormRunner])

export const RegistrationTemplateEmbedded = RegistrationTemplate.mapContext<
  AuthenticationReadOnlyContext & AuthenticationWriteableState
>((a) => a.registration).mapState(Authentication.Updaters.Core.registration)
