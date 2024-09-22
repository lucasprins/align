import { LoginPayload, User } from '@align/api-types'
import { View } from '@align/core-react'

import {
  AsyncState,
  ForeignMutationsInput,
  FormState,
  Maybe,
  propertyUpdater,
  replaceWith,
  Synchronized,
  Unit,
  Updater,
} from '@align/core'

import { LoginForm } from './authentication.types'
import { Registration } from './domains/registration/registration.domain'
import { WorkspaceCreation } from './domains/workspace-creation/domain'

export type Authentication = {
  readonly user: Synchronized<LoginPayload, Maybe<User>>
  readonly logout: Synchronized<Unit, boolean>
  readonly loginForm: FormState<LoginForm>

  readonly registration: Registration
  readonly workspaceCreation: WorkspaceCreation
}

export const Authentication = {
  Default: (): Authentication => ({
    user: Synchronized.Default({ email: '', password: '', rememberMe: true }, AsyncState.loading()),
    logout: Synchronized.Default(false),
    loginForm: FormState.Default.idle({ email: '', password: '', rememberMe: true }),

    registration: Registration.Default(),
    workspaceCreation: WorkspaceCreation.Default(),
  }),

  Updaters: {
    Core: {
      user: propertyUpdater<Authentication>()('user'),
      logout: propertyUpdater<Authentication>()('logout'),
      loginForm: propertyUpdater<Authentication>()('loginForm'),

      registration: propertyUpdater<Authentication>()('registration'),
      workspaceCreation: propertyUpdater<Authentication>()('workspaceCreation'),
    },

    Template: {
      logout: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.logout(Synchronized.Updaters.sync(AsyncState.toLoading()))
      },

      validateLoginForm: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.loginForm(FormState.Updaters.toValidating())
      },

      resetLoginForm: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.loginForm(replaceWith(Authentication.Default().loginForm))
      },
    },

    Coroutine: {
      resetUserValue: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.user(
          Synchronized.Updaters.value(replaceWith(Authentication.Default().user))
        )
      },
      resetUserSync: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.user(Synchronized.Updaters.sync(AsyncState.toUnloaded()))
      },
      resetLogout: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.logout(Synchronized.Updaters.sync(AsyncState.toUnloaded()))
      },
    },
  },

  Operations: {
    getUser: (user: Authentication['user']): Maybe<User> => {
      return AsyncState.isLoaded(user.sync) ? user.sync.value : Maybe.nothing()
    },
    hasLoginFailed: (authentication: Authentication) => {
      return (
        FormState.Assert.isSubmitted(authentication.loginForm) &&
        AsyncState.isLoaded(authentication.user.sync) &&
        Maybe.isNothing(authentication.user.sync.value)
      )
    },
  },

  ForeignMutations: (input: ForeignMutationsInput<AuthenticationReadOnlyContext, AuthenticationWriteableState>) => ({
    login: (user: User) =>
      input.setState(
        Authentication.Updaters.Core.user(
          Synchronized.Updaters.sync(() => AsyncState.loaded<Maybe<User>>(Maybe.just(user)))
        )
      ),
    logout: () => input.setState(Authentication.Updaters.Template.logout()),
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
