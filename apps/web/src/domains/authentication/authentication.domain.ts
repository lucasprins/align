import { AsyncState, ForeignMutationsInput, FormState, Maybe, propertyUpdater, unit, Unit, Updater } from '@align/core'
import { View } from '@align/core-react'

import { Queryable } from '../../lib/query'
// import { User } from './domains/entities/user'

export type LoginForm = {
  email: string
  password: string
}

export type RegisterForm = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type CreateWorkspaceForm = {
  name: string
  url: string
  companySize: string
  role: string
}

// TODO : Split into  child domains?
type Authentication = {
  loginForm: FormState<LoginForm>
  registerForm: FormState<RegisterForm>
  createWorkspaceForm: FormState<CreateWorkspaceForm>

  // user: Queryable<Unit, User>
}

const Authentication = {
  Default: (): Authentication => ({
    loginForm: FormState.Default.idle({ email: '', password: '' }),
    registerForm: FormState.Default.idle({ username: '', email: '', password: '', confirmPassword: '' }),
    createWorkspaceForm: FormState.Default.idle({ name: '', url: '', companySize: '', role: '' }),

    // user: Queryable.Default.Loading(unit),
  }),

  Updaters: {
    Core: {
      // user: propertyUpdater<Authentication>()('user'),
      loginForm: propertyUpdater<Authentication>()('loginForm'),
      registerForm: propertyUpdater<Authentication>()('registerForm'),
      createWorkspaceForm: propertyUpdater<Authentication>()('createWorkspaceForm'),
    },

    Template: {},

    Coroutine: {
      // login: (user: User): Updater<Authentication> => {
      //   return Authentication.Updaters.Core.user(Queryable.Updaters.response(AsyncState.toLoaded(user)))
      // },
    },
  },

  Operations: {
    // getUser: (user: Authentication['user']): Maybe<User> =>
    //   AsyncState.isLoaded(user.response) ? Maybe.just(user.response.value) : Maybe.nothing(),
  },

  ForeignMutations: (input: ForeignMutationsInput<AuthenticationReadOnlyContext, AuthenticationWriteableState>) => ({
    // login: (user: User) => input.setState(Authentication.Updaters.Core.user((_) => AsyncState.Default.loaded(Option.Default.Full(user)))),
    // logout: () => input.setState(Authentication.Updaters.Core.user(replaceWith(AsyncState.Default.unloaded()))),
  }),
}

export type AuthenticationForeignMutationsExpected = Unit
export type AuthenticationForeignMutationsExposed = ReturnType<typeof Authentication.ForeignMutations>

export type AuthenticationReadOnlyContext = Unit
export type AuthenticationWriteableState = Authentication

export type AuthenticationView = View<
  AuthenticationReadOnlyContext & AuthenticationWriteableState,
  AuthenticationWriteableState,
  AuthenticationForeignMutationsExpected,
  {}
>

export { Authentication }
