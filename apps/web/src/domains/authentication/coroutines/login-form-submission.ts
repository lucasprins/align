import { AsyncState, FormState, replaceWith, Synchronized, unit } from '@align/core'

import { LoginPayload } from '@align/api-types'
import { Authentication } from '../authentication.domain'
import { Co } from './_builder'

export const loginFormSubmission = Co.GetState().then(({ loginForm: { values } }) =>
  Co.Seq([
    Co.SetState(Authentication.Updaters.Core.user(Synchronized.Updaters.value(replaceWith<LoginPayload>(values)))),
    Co.SetState(Authentication.Updaters.Core.user(Synchronized.Updaters.sync(AsyncState.toLoading()))),

    Co.While(([auth]) => AsyncState.isLoading(auth.user.sync), Co.Wait(50)),

    Co.GetState().then((state) => {
      if (AsyncState.isLoaded(state.user.sync)) {
        return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitted()))
      } else {
        return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmissionFailed()))
      }
    }),
  ])
)
