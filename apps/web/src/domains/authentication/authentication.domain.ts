import {
  AsyncState,
  Debounced,
  ForeignMutationsInput,
  FormState,
  Just,
  Maybe,
  propertyUpdater,
  replaceWith,
  Synchronized,
  Unit,
  Updater,
  Value,
} from '@align/core'

import { LoginPayload, User } from '@align/api-types'
import { View } from '@align/core-react'

import { CreateWorkspaceForm, LoginForm } from './authentication.types'
import { Registration } from './domains/registration/registration.domain'

type Authentication = {
  readonly user: Synchronized<LoginPayload, Maybe<User>>
  readonly logout: Synchronized<Unit, boolean>
  readonly loginForm: FormState<LoginForm>
  readonly createWorkspaceForm: FormState<CreateWorkspaceForm>

  readonly registration: Registration
}

const Authentication = {
  Default: (): Authentication => ({
    user: Synchronized.Default({ email: '', password: '', rememberMe: true }, AsyncState.loading()),
    logout: Synchronized.Default(false),
    loginForm: FormState.Default.idle({ email: '', password: '', rememberMe: true }),
    createWorkspaceForm: FormState.Default.idle({
      name: '',
      url: Debounced.Default(Synchronized.Default(Value.Default(''))),
      companySize: '',
      role: '',
    }),

    registration: Registration.default(),
  }),

  Updaters: {
    Core: {
      user: propertyUpdater<Authentication>()('user'),
      logout: propertyUpdater<Authentication>()('logout'),
      loginForm: propertyUpdater<Authentication>()('loginForm'),
      createWorkspaceForm: propertyUpdater<Authentication>()('createWorkspaceForm'),

      registration: propertyUpdater<Authentication>()('registration'),
    },

    Template: {
      logout: (): Updater<Authentication> => {
        return Authentication.Updaters.Core.logout(Synchronized.Updaters.sync(AsyncState.toLoading()))
      },

      updateWorkspaceFormUrl: (url: string): Updater<Authentication> => {
        return Authentication.Updaters.Core.createWorkspaceForm((form) => {
          return FormState.Updaters.field<CreateWorkspaceForm>()(
            'url',
            Debounced.Updaters.Template.value(
              Synchronized.Updaters.value<Value<string>, boolean>(Value.Updaters.value(replaceWith(url)))
            )(form.values.url)
          )(form)
        })
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
    isLoginFailed: (authentication: Authentication) => {
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
