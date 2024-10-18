import { CreateWorkspacePayload, CreateWorkspaceResult } from '@align/api-types'
import { HttpResult } from '@align/core'

import { getEndpointUrl } from '#/lib/api'
import { WorkspaceCreationEndpoints } from '../api'

export const createWorkspace = async (payload: CreateWorkspacePayload): Promise<HttpResult<CreateWorkspaceResult>> => {
  const { method, path } = WorkspaceCreationEndpoints.createWorkspace

  try {
    const response = await fetch(getEndpointUrl(path), {
      method,
      credentials: 'include',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const json = (await response.json()) as CreateWorkspaceResult
      return HttpResult.success(json, response.status)
    }
  } catch (error) {}

  return HttpResult.failed()
}
