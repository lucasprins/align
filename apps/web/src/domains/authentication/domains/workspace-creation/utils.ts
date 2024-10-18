import { CreateWorkspaceResult } from '@align/api-types'
import { AsyncState, HttpResult } from '@align/core'

import { WorkspaceCreation } from './domain'

export function requireWorkspaceCreated<T>(
  context: WorkspaceCreation,
  f: (result: Extract<CreateWorkspaceResult, { isSuccess: true }>) => T
) {
  const { sync } = context.result

  if (AsyncState.isLoaded(sync) && HttpResult.isSuccess(sync.value) && sync.value.value.isSuccess) {
    return f(sync.value.value)
  }
}
