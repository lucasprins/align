export type Workspace = {
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
