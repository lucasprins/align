import { User } from './user'

export type LoginPayload = {
  email: string
  password: string
  rememberMe: boolean
}

export type RegisterPayload = {
  email: string
  password: string
}

export type RegistrationError = 'InvalidEmail' | 'DuplicateEmail' | 'UserNotFound' | 'IdentityError'

export type RegistrationResult =
  | {
      isSuccess: true
      user: User
    }
  | {
      isSuccess: false
      error: RegistrationError
    }
