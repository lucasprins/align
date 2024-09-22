import { CreateWorkspacePayload } from '@align/api-types'
import { AsyncState, FormState, replaceWith, Synchronized } from '@align/core'

import { WorkspaceCreation } from '../domain'
import { Co } from './_builder'

export const createWorkspaceFormSubmission = Co.GetState().then(({ form: { values } }) => {
  console.log('submit')

  return Co.Seq([
    Co.SetState(
      WorkspaceCreation.Updaters.Core.result(
        Synchronized.Updaters.value(
          replaceWith<CreateWorkspacePayload>({
            name: values.name,
            url: values.url.value,
            companySize: values.companySize,
            role: values.role,
          })
        )
      )
    ),

    Co.SetState(WorkspaceCreation.Updaters.Core.result(Synchronized.Updaters.sync(AsyncState.toLoading()))),

    Co.While(([state]) => AsyncState.isLoading(state.result.sync), Co.Wait(50)),

    Co.GetState().then((state) => {
      if (AsyncState.isLoaded(state.result.sync)) {
        return Co.SetState(WorkspaceCreation.Updaters.Core.form(FormState.Updaters.toSubmitted()))
      } else {
        return Co.SetState(WorkspaceCreation.Updaters.Core.form(FormState.Updaters.toSubmissionFailed()))
      }
    }),
  ])
})
