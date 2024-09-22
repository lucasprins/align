import { getEndpointUrl } from '#/lib/api'
import { AuthenticationEndpoints } from '../authentication.api'

export default async function logout(): Promise<boolean> {
  try {
    const response = await fetch(getEndpointUrl(AuthenticationEndpoints.logout), {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) return true
  } catch (error) {
    console.log(error)
  }

  return false
}
