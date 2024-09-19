import { CoTypedFactory } from '@align/core-react'

import { RegistrationReadOnlyContext, RegistrationWriteableState } from '../registration.domain'

export const Co = CoTypedFactory<RegistrationReadOnlyContext, RegistrationWriteableState>()
