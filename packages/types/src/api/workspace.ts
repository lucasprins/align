import { Guid } from './index'

export type Workspace = {
  id: Guid
  name: string
  url: string
  logoUrl?: string
}

export type WorkspaceValidationError = 'UrlTaken' | 'InvalidName'

export type CreateWorkspaceResult =
  | {
      isSuccess: true
      workspace: Workspace
    }
  | {
      isSuccess: false
      validationError: WorkspaceValidationError
    }

export type WorkspaceMemberRole = 'Guest' | 'Member' | 'Admin'
