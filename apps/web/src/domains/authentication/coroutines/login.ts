import { LoginPayload, User } from '@align/api-types'
import { apiResultStatuses, Maybe, Unit } from '@align/core'
import { Synchronize } from '@align/core-react'

import { AuthenticationAPI } from '../authentication.api'
import { Authentication } from '../authentication.domain'
import { Co } from './_builder'

export const login = Co.Repeat(
  Synchronize<LoginPayload, Maybe<User>>({
    synchronizeFunc: AuthenticationAPI.login,
    errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
  }).embed((auth) => auth.user, Authentication.Updaters.Core.user)
)
