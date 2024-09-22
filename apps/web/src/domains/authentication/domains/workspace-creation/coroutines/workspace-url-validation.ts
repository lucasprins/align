import { Co } from './_builder'

import { apiResultStatuses, Synchronized, Updater, Value } from '@align/core'
import { Debounce, Synchronize } from '@align/core-react'
import { WorkspaceCreationAPI } from '../api'
import { WorkspaceCreation } from '../domain'

export const workspaceUrlValidation = Co.Repeat(
  Debounce<Synchronized<Value<string>, boolean>>({
    k: Synchronize<Value<string>, boolean>({
      synchronizeFunc: WorkspaceCreationAPI.validateWorkspaceUrl,
      errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
      maxAttempts: 5,
      delayBetweenAttemptsInMs: 150,
    }),
    debounceDurationInMs: 300,
    waitBeforeRetryOnTransientFailure: 500,
  }).embed(
    (context) => context.form.values.url,
    (updater) => {
      return Updater<WorkspaceCreation>(
        (context) =>
          ({
            ...context,
            form: {
              ...context.form,
              values: {
                ...context.form.values,
                url: updater(context.form.values.url),
              },
            },
          }) satisfies WorkspaceCreation
      )
    }
  )
)
