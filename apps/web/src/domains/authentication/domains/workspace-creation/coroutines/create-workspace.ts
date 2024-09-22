import { CreateWorkspacePayload, CreateWorkspaceResult } from '@align/api-types'
import { apiResultStatuses, Maybe } from '@align/core'
import { Synchronize } from '@align/core-react'

import { WorkspaceCreationAPI } from '../api'
import { WorkspaceCreation } from '../domain'
import { Co } from './_builder'

export const createWorkspace = Co.Repeat(
  Synchronize<CreateWorkspacePayload, Maybe<CreateWorkspaceResult>>({
    synchronizeFunc: WorkspaceCreationAPI.createWorkspace,
    errorProcessor: (_: any) => (_ in apiResultStatuses ? _ : 'permanent failure'),
  }).embed((context) => context.result, WorkspaceCreation.Updaters.Core.result)
)
