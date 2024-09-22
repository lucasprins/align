import { CoTypedFactory } from '@align/core-react'

import { WorkspaceCreationReadOnlyContext, WorkspaceCreationWriteableState } from '../domain'

export const Co = CoTypedFactory<WorkspaceCreationReadOnlyContext, WorkspaceCreationWriteableState>()
