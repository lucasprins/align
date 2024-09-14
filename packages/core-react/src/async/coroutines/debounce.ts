import { ApiResultStatus, Debounced, DebouncedStatus, DirtyStatus, replaceWith, Unit } from '@align/core'

import { CoTypedFactory } from '../../coroutine/co-typed-factory'
import { Coroutine } from '../../coroutine/coroutine'

export type DebounceOptions<Value> = {
  k: Coroutine<Value, Value, ApiResultStatus>
  debounceDurationInMs: number
  waitBeforeRetryOnTransientFailure: number
}

export const Debounce = <Value>({
  k,
  debounceDurationInMs,
  waitBeforeRetryOnTransientFailure = debounceDurationInMs * 2,
}: DebounceOptions<Value>) => {
  const Co = CoTypedFactory<Unit, Debounced<Value>>()
  const updaters = Debounced.Updaters

  return Co.Seq([
    Co.SetState(updaters.Core.status(replaceWith<DebouncedStatus>('waiting for dirty'))),
    Co.While(
      ([current]) => {
        return current.dirty != 'dirty' || Date.now() - current.lastUpdated <= debounceDurationInMs
      },
      Co.Wait(debounceDurationInMs / 5)
    ),
    Co.SetState(updaters.Core.dirty(replaceWith<DirtyStatus>('dirty but being processed'))),
    Co.SetState(updaters.Core.status(replaceWith<DebouncedStatus>('just detected dirty, starting processing'))),
    Co.Any([
      // shortcircuit the validation if it takes longer than the whole cycle in the presence of an underwater update of the field
      Co.Seq([
        Co.While(
          ([current]) => current.dirty != 'dirty' || Date.now() - current.lastUpdated <= debounceDurationInMs,
          Co.Wait(debounceDurationInMs / 5)
        ),
        Co.SetState(updaters.Core.status(replaceWith<DebouncedStatus>('processing shortcircuited'))),
        Co.Wait(debounceDurationInMs / 2),
      ]),
      k
        .embed((_: Debounced<Value>) => _, updaters.Core.value)
        .then((apiResult) => {
          return Co.Seq([
            Co.SetState(updaters.Core.status(replaceWith<DebouncedStatus>('processing finished'))),
            // Co.Wait(250)
          ]).then(() => {
            return Co.GetState().then((current) => {
              // alert(apiResult)
              if (apiResult == 'success' || apiResult == 'permanent failure') {
                // maybe a new change has already reset dirty, in that case we need to start all over again
                if (current.dirty == 'dirty but being processed') {
                  return Co.Seq([
                    Co.SetState(
                      updaters.Core.status(
                        replaceWith<DebouncedStatus>(
                          'state was still dirty but being processed, resetting to not dirty'
                        )
                      )
                    ),
                    // use UpdateState to make sure that we look up the state at the last possible moment to account for delays
                    Co.UpdateState((state) =>
                      state.dirty == 'dirty but being processed'
                        ? updaters.Core.dirty(replaceWith<DirtyStatus>('not dirty'))
                        : updaters.Core.dirty(replaceWith<DirtyStatus>('dirty'))
                    ),
                  ])
                } else {
                  return Co.Seq([
                    Co.SetState(
                      updaters.Core.status(
                        replaceWith<DebouncedStatus>(
                          'state was changed underwater back to dirty, leaving the dirty flag alone'
                        )
                      )
                    ),
                    Co.SetState(updaters.Core.dirty(replaceWith<DirtyStatus>('dirty'))),
                    // Co.Wait(250)
                  ])
                }
              } else {
                return Co.Seq([
                  Co.SetState(
                    updaters.Core.status(replaceWith<DebouncedStatus>('inner call failed with transient failure'))
                  ),
                  Co.SetState(updaters.Core.dirty(replaceWith<DirtyStatus>('dirty'))),
                  Co.Wait(waitBeforeRetryOnTransientFailure),
                ])
              }
            })
          })
        }),
    ]),
  ])
}
