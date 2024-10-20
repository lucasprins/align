import { CreateWorkspacePayload, CreateWorkspaceResult, User } from '@align/api-types'
import { View } from '@align/core-react'

import {
  AsyncState,
  Debounced,
  ForeignMutationsInput,
  FormState,
  HttpResult,
  propertyUpdater,
  replaceWith,
  Synchronized,
  Unit,
  Updater,
  Value,
} from '@align/core'

import { WorkspaceCreationForm, WorkspaceUrlAvailability } from './types'

export type WorkspaceCreation = {
  readonly result: Synchronized<CreateWorkspacePayload, HttpResult<CreateWorkspaceResult>>
  readonly form: FormState<WorkspaceCreationForm>
}

export const WorkspaceCreation = {
  Default: (): WorkspaceCreation => ({
    result: Synchronized.Default({ name: '', url: '', companySize: '', role: '' }),
    form: FormState.Default.idle<WorkspaceCreationForm>({
      name: '',
      url: Debounced.Default(Synchronized.Default(Value.Default(''))),
      companySize: '',
      role: '',
    }),
  }),

  Updaters: {
    Core: {
      result: propertyUpdater<WorkspaceCreation>()('result'),
      form: propertyUpdater<WorkspaceCreation>()('form'),
    },

    Template: {
      validateForm: (): Updater<WorkspaceCreation> => {
        return WorkspaceCreation.Updaters.Core.form(FormState.Updaters.toValidating())
      },

      setWorkspaceFormUrl: (url: string): Updater<WorkspaceCreation> =>
        WorkspaceCreation.Updaters.Core.form((form) =>
          FormState.Updaters.field<WorkspaceCreationForm>()(
            'url',
            Debounced.Updaters.Template.value(
              Synchronized.Updaters.value<Value<string>, boolean>(Value.Updaters.value(replaceWith(url)))
            )(form.values.url)
          )(form)
        ),
    },
  },

  Operations: {
    isWorkspaceUrlValidationLoaded: (context: WorkspaceCreation) => {
      return AsyncState.isLoaded(context.form.values.url.sync)
    },

    isWorkspaceUrlTaken: (context: WorkspaceCreation) => {
      return AsyncState.isLoaded(context.form.values.url.sync) && context.form.values.url.sync.value === false
    },

    isWorkspaceUrlAvailable: (context: WorkspaceCreation) => {
      return AsyncState.isLoaded(context.form.values.url.sync) && context.form.values.url.sync.value === true
    },

    getWorkspaceUrlAvailability: (context: WorkspaceCreation): WorkspaceUrlAvailability => {
      return !WorkspaceCreation.Operations.isWorkspaceUrlValidationLoaded(context)
        ? 'unknown'
        : WorkspaceCreation.Operations.isWorkspaceUrlTaken(context)
          ? 'taken'
          : 'available'
    },

    isFormLoading: (context: WorkspaceCreation) => {
      return FormState.Assert.isValidating(context.form) || FormState.Assert.isSubmitting(context.form)
    },

    canSubmitForm: (context: WorkspaceCreation) => {
      return (
        !WorkspaceCreation.Operations.isFormLoading(context) && context.form.isDirty,
        WorkspaceCreation.Operations.isWorkspaceUrlAvailable(context)
      )
    },

    hasWorkspaceCreationFailed: (context: WorkspaceCreation) => {
      return (
        FormState.Assert.isSubmitted(context.form) &&
        AsyncState.isLoaded(context.result.sync) &&
        (!HttpResult.isSuccess(context.result.sync.value) || context.result.sync.value.value.isSuccess === false)
      )
    },

    hasWorkspaceCreationSucceeded: (context: WorkspaceCreation) => {
      return (
        FormState.Assert.isSubmitted(context.form) &&
        AsyncState.isLoaded(context.result.sync) &&
        HttpResult.isSuccess(context.result.sync.value) &&
        context.result.sync.value.value.isSuccess === false
      )
    },
  },

  ForeignMutations: (
    input: ForeignMutationsInput<WorkspaceCreationReadOnlyContext, WorkspaceCreationWriteableState>
  ) => ({}),
}

export type WorkspaceCreationForeignMutationsExpected = {
  login: (user: User) => void
  logout: () => void
}

export type WorkspaceCreationForeignMutationsExposed = ReturnType<typeof WorkspaceCreation.ForeignMutations>

export type WorkspaceCreationReadOnlyContext = Unit
export type WorkspaceCreationWriteableState = WorkspaceCreation

export type WorkspaceCreationView = View<
  WorkspaceCreationReadOnlyContext & WorkspaceCreationWriteableState,
  WorkspaceCreationWriteableState,
  WorkspaceCreationForeignMutationsExpected,
  {}
>
