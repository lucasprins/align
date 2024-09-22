import { AsyncState, Debounced, FormState } from '@align/core'

import { Co } from './coroutines/_builder'
import { createWorkspace } from './coroutines/create-workspace'
import { createWorkspaceFormSubmission } from './coroutines/workspace-form-submission'
import { createWorkspaceFormValidation } from './coroutines/workspace-form-validation'
import { workspaceUrlValidation } from './coroutines/workspace-url-validation'
import { WorkspaceCreationForeignMutationsExpected } from './domain'

export const WorkspaceCreationCreateWorkspaceRunner = Co.Template<WorkspaceCreationForeignMutationsExpected>(
  createWorkspace,
  {
    interval: 15,
    runFilter: (props) => AsyncState.isLoading(props.context.result.sync),
  }
)

export const WorkspaceCreationWorkspaceUrlValidationRunner = Co.Template<WorkspaceCreationForeignMutationsExpected>(
  workspaceUrlValidation,
  {
    interval: 10,
    runFilter: (props) =>
      Debounced.Operations.shouldCoroutineRun(props.context.form.values.url) && !!props.context.form.values.url.value,
  }
)

export const WorkspaceCreationValidateFormRunner = Co.Template<WorkspaceCreationForeignMutationsExpected>(
  createWorkspaceFormValidation,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isValidating(props.context.form),
  }
)

export const WorkspaceCreationSubmitFormRunner = Co.Template<WorkspaceCreationForeignMutationsExpected>(
  createWorkspaceFormSubmission,
  {
    interval: 15,
    runFilter: (props) => FormState.Assert.isSubmitting(props.context.form),
  }
)
