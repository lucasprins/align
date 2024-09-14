import { apiResultStatuses, Unit } from '@align/core'
import { Synchronize } from '@align/core-react'

import { AuthenticationAPI } from '../authentication.api'
import { Authentication } from '../authentication.domain'
import { Co } from './_builder'

export const logout = Co.Repeat(
  Synchronize<Unit, boolean>({
    synchronizeFunc: AuthenticationAPI.logout,
    errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
  }).embed((auth) => auth.logout, Authentication.Updaters.Core.logout)
)

export const logoutCleanup = Co.Seq([
  Co.SetState(Authentication.Updaters.Coroutine.resetUserValue()),
  Co.SetState(Authentication.Updaters.Coroutine.resetUserSync()),
  Co.SetState(Authentication.Updaters.Coroutine.resetLogout()),
])
