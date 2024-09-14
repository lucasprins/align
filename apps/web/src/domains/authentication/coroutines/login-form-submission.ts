import { AsyncState, FormState, replaceWith, Synchronized, unit } from '@align/core'

import { LoginPayload } from '@align/api-types'
import { Authentication } from '../authentication.domain'
import { Co } from './_builder'

export const loginFormSubmission = Co.GetState().then(({ loginForm: { values } }) =>
  Co.Seq([
    Co.SetState(Authentication.Updaters.Core.user(Synchronized.Updaters.value(replaceWith<LoginPayload>(values)))),
    Co.SetState(Authentication.Updaters.Core.user(Synchronized.Updaters.sync(AsyncState.toLoading()))),

    // Wait to see if the user async state stopped loading
    Co.While(([auth]) => AsyncState.isLoading(auth.user.sync), Co.Wait(50)),

    Co.GetState().then((state) => {
      switch (state.user.sync.kind) {
        // If the user was sucesfully loaded, set submission to submitted
        case 'loaded': {
          return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmitted()))
        }

        // If loading the user failed, the form submission failed.
        case 'failed': {
          return Co.SetState(Authentication.Updaters.Core.loginForm(FormState.Updaters.toSubmissionFailed()))
        }

        // Do nothing
        default: {
          return Co.Return(unit)
        }
      }
    }),
  ])
)
