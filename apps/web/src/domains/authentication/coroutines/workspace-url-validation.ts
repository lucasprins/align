import { Co } from './_builder'

import { apiResultStatuses, Synchronized, Updater, Value } from '@align/core'
import { Debounce, Synchronize } from '@align/core-react'
import { AuthenticationAPI } from '../authentication.api'
import { Authentication } from '../authentication.domain'

export const workspaceUrlValidation = Co.Repeat(
  Debounce<Synchronized<Value<string>, boolean>>({
    k: Synchronize<Value<string>, boolean>({
      synchronizeFunc: AuthenticationAPI.validateWorkspaceUrl,
      errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
      maxAttempts: 5,
      delayBetweenAttemptsInMs: 150,
    }),
    debounceDurationInMs: 300,
    waitBeforeRetryOnTransientFailure: 500,
  }).embed(
    (auth) => auth.createWorkspaceForm.values.url,
    (updater) => {
      return Updater<Authentication>((auth) => {
        return {
          ...auth,
          createWorkspaceForm: {
            ...auth.createWorkspaceForm,
            values: {
              ...auth.createWorkspaceForm.values,
              url: updater(auth.createWorkspaceForm.values.url),
            },
          },
        }
      })
    }
  )
)
