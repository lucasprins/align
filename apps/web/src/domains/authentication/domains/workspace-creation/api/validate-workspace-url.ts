import { Value } from '@align/core'

import { getEndpointUrl } from '#/lib/api'
import { WorkspaceCreationEndpoints } from '../api'

export const validateWorkspaceUrl = async (url: Value<string>): Promise<boolean> => {
  const { method, path } = WorkspaceCreationEndpoints.isUrlAvailable(url.value)

  try {
    const response = await fetch(getEndpointUrl(path), {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return response.json()
    }
  } catch (error) {}

  return false
}
