import { RegisterPayload } from '@align/api-types'
import { AsyncState, FormState, replaceWith, Synchronized } from '@align/core'

import { Registration } from '../registration.domain'
import { Co } from './_builder'

export const registerFormSubmission = Co.GetState().then(({ form: { values } }) =>
  Co.Seq([
    Co.SetState(
      Registration.Updaters.Core.result(
        Synchronized.Updaters.value(replaceWith<RegisterPayload>({ email: values.email, password: values.password }))
      )
    ),
    Co.SetState(Registration.Updaters.Core.result(Synchronized.Updaters.sync(AsyncState.toLoading()))),

    Co.While(([state]) => AsyncState.isLoading(state.result.sync), Co.Wait(50)),

    Co.GetState().then((state) => {
      if (AsyncState.isLoaded(state.result.sync)) {
        return Co.SetState(Registration.Updaters.Core.form(FormState.Updaters.toSubmitted()))
      } else {
        return Co.SetState(Registration.Updaters.Core.form(FormState.Updaters.toSubmissionFailed()))
      }
    }),
  ])
)
