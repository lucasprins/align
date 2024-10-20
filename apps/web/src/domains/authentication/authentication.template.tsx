import { Template } from '@align/core-react'

import {
  AuthenticationForeignMutationsExpected,
  AuthenticationReadOnlyContext,
  AuthenticationView,
  AuthenticationWriteableState,
} from './authentication.domain'

import { AuthenticationSubmitLoginFormRunner, AuthenticationValidateLoginFormRunner } from './coroutines/_runners'

export const AuthenticationTemplate = Template.Default<
  AuthenticationReadOnlyContext,
  AuthenticationWriteableState,
  AuthenticationForeignMutationsExpected,
  AuthenticationView
>((props) => {
  return <props.view {...props} />
}).any([AuthenticationValidateLoginFormRunner, AuthenticationSubmitLoginFormRunner])
