import { DateTimeString, Guid } from './index'
import { Workspace, WorkspaceMemberRole } from './workspace'

export type User = {
  id: Guid
  email: string
  userName: string
  fullName?: string
  avatarUrl?: string
  workspaceMemberships: UserWorkspaceMembership[]
}

export type UserWorkspaceMembership = {
  role: WorkspaceMemberRole
  joinedAt: DateTimeString
  workspace: Workspace
}
