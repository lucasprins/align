import { Guid } from '@align/utility-types'

import { User } from './user'

export type Workspace = {
  id: Guid
  name: string
  url: string
  logoUrl?: string
}

export type CreateWorkspacePayload = {
  name: string
  url: string
  companySize: string
  role: string
}

export type WorkspaceValidationError = 'UrlTaken' | 'InvalidUrl'

export type CreateWorkspaceResult =
  | {
      isSuccess: true
      workspace: Workspace
      user?: User
    }
  | {
      isSuccess: false
      validationError: WorkspaceValidationError
    }

export type WorkspaceMemberRole = 'Guest' | 'Member' | 'Admin'
