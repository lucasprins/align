import { defineFormResolver, FormErrors, FormState } from '@align/core'

import { WorkspaceCreation } from '../domain'
import { WorkspaceCreationForm } from '../types'
import { Co } from './_builder'

const createWorkspaceFormResolver = defineFormResolver<WorkspaceCreationForm>((values) => {
  const errors: FormErrors<WorkspaceCreationForm> = {}

  if (!values.name) {
    errors.name = 'Name is required'
  }

  if (!values.url) {
    errors.url = 'Worksapce URL is required'
  }

  if (!values.companySize) {
    errors.companySize = 'Please specify your company size, or choose not to share'
  }

  if (!values.role) {
    errors.role = 'Please specify your role, or choose not to share'
  }

  return { errors }
})

export const createWorkspaceFormValidation = Co.GetState().then((state) => {
  const { errors } = createWorkspaceFormResolver(state.form.values)

  if (Object.keys(errors).length > 0) {
    return Co.SetState(
      WorkspaceCreation.Updaters.Core.form(FormState.Updaters.toInvalid<WorkspaceCreationForm>(errors))
    )
  } else {
    return Co.SetState(WorkspaceCreation.Updaters.Core.form(FormState.Updaters.toSubmitting()))
  }
})
