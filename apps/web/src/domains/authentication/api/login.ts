import { LoginPayload, User } from '@align/api-types'
import { Maybe } from '@align/core'

import { getEndpointUrl } from '@/lib/api'
import { AuthenticationEndpoints } from '../authentication.api'

export const login = async (payload: LoginPayload): Promise<Maybe<User>> => {
  try {
    // await Http.sleep(5000)

    const response = await fetch(getEndpointUrl(AuthenticationEndpoints.login), {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('response', response)

    if (response.ok) {
      return Maybe.just((await response.json()) as User)
    }
  } catch (error) {
    console.log(error)
    throw error
  }

  return Maybe.nothing()
}
