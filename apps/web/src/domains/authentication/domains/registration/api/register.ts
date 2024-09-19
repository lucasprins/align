import { RegisterPayload, RegistrationResult } from '@align/api-types'
import { Maybe } from '@align/core'

import { AuthenticationEndpoints } from '@/domains/authentication/authentication.api'
import { getEndpointUrl } from '@/lib/api'

export const register = async (payload: RegisterPayload): Promise<Maybe<RegistrationResult>> => {
  try {
    const response = await fetch(getEndpointUrl(AuthenticationEndpoints.register), {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('response', response)

    if (response.ok) {
      return Maybe.just((await response.json()) as RegistrationResult)
    }
  } catch (error) {
    console.log(error)
    throw error
  }

  return Maybe.nothing()
}
