import { DomainEndpoints } from '#/lib/http'
import { createWorkspace } from './api/create-workspace'
import { validateWorkspaceUrl } from './api/validate-workspace-url'

export const WorkspaceCreationEndpoints = {
  createWorkspace: { method: 'POST', path: '/api/workspace' },

  isUrlAvailable: (url: string) => {
    return { method: 'GET', path: `/api/workspace/isUrlAvailable?url=${url}` }
  },
} as const satisfies DomainEndpoints

export const WorkspaceCreationAPI = {
  createWorkspace,
  validateWorkspaceUrl,
}
