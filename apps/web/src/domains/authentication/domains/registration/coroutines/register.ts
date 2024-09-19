import { RegisterPayload, RegistrationResult } from '@align/api-types'
import { apiResultStatuses, Maybe } from '@align/core'
import { Synchronize } from '@align/core-react'

import { RegistrationAPI } from '../registration.api'
import { Registration } from '../registration.domain'
import { Co } from './_builder'

export const register = Co.Repeat(
  Synchronize<RegisterPayload, Maybe<RegistrationResult>>({
    synchronizeFunc: RegistrationAPI.register,
    errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
  }).embed((auth) => auth.result, Registration.Updaters.Core.result)
)
