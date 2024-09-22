import { CreateWorkspacePayload, CreateWorkspaceResult } from '@align/api-types'
import { Maybe } from '@align/core'

import { WorkspaceCreationEndpoints } from '../api'
import { getEndpointUrl } from '#/lib/api'

export const createWorkspace = async (payload: CreateWorkspacePayload): Promise<Maybe<CreateWorkspaceResult>> => {
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
      return Maybe.just((await response.json()) as CreateWorkspaceResult)
    }
  } catch (error) {}

  return Maybe.nothing()
}
