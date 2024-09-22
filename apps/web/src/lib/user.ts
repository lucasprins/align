import { User } from '@align/api-types'

import { routes } from './routes'

export const canAccessWorkspace = (workspaceUrl: string, user: User): boolean => {
  return user.workspaceMemberships.find((w) => w.workspace.url === workspaceUrl) !== undefined
}

export const getWorkspaceRedirectUrl = (user: User) => {
  return user.workspaceMemberships.length === 0
    ? routes.auth.createWorkspace
    : routes.workspace.inbox(user.workspaceMemberships[0].workspace.url)
}
