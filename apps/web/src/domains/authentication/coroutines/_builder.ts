import { CoTypedFactory } from '@align/core-react'

import { AuthenticationReadOnlyContext, AuthenticationWriteableState } from '../authentication.domain'

export const Co = CoTypedFactory<AuthenticationReadOnlyContext, AuthenticationWriteableState>()
