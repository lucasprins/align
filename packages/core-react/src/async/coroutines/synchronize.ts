import {
  ApiResultStatus,
  AsyncState,
  BasicFunc,
  Either,
  ErrorPermanenceStatus,
  id,
  Synchronized,
  Unit,
} from '@align/core'

import { CoTypedFactory } from '../../coroutine/co-typed-factory'
import { Coroutine } from '../../coroutine/coroutine'

export type SynchronizeFunc<Value, SynchronizeResult> = BasicFunc<Value, Promise<SynchronizeResult>>

export type SynchronizeOptions<Value, SynchronizeResult> = {
  synchronizeFunc: SynchronizeFunc<Value, SynchronizeResult>
  errorProcessor: BasicFunc<unknown, ErrorPermanenceStatus>
  maxAttempts?: number
  delayBetweenAttemptsInMs?: number
}

export const Synchronize = <Value, SynchronizeResult>({
  synchronizeFunc,
  errorProcessor,
  maxAttempts = 3,
  delayBetweenAttemptsInMs = 300,
}: SynchronizeOptions<Value, SynchronizeResult>): Coroutine<
  Synchronized<Value, SynchronizeResult>,
  Synchronized<Value, SynchronizeResult>,
  ApiResultStatus
> => {
  const Co = CoTypedFactory<Unit, Synchronized<Value, SynchronizeResult>>()

  return Co.SetState(Synchronized.Updaters.sync(AsyncState.toLoading())).then(() =>
    Co.GetState().then((current) =>
      Co.Await(() => synchronizeFunc(current), id).then((apiResult) => {
        if (Either.isRight(apiResult)) {
          return Co.SetState(Synchronized.Updaters.sync(AsyncState.toLoaded(apiResult.value))).then(() =>
            Co.Return<ApiResultStatus>('success')
          )
        } else if (errorProcessor(apiResult.value) === 'transient failure' && maxAttempts > 0) {
          return Co.Wait(delayBetweenAttemptsInMs).then(() =>
            Synchronize({ synchronizeFunc, errorProcessor, maxAttempts: maxAttempts - 1, delayBetweenAttemptsInMs })
          )
        } else {
          return Co.SetState(Synchronized.Updaters.sync(AsyncState.toFailed(apiResult.value))).then(() =>
            Co.Return<ApiResultStatus>('permanent failure')
          )
        }
      })
    )
  )
}

// export const SynchronizeWithValueUpdater = <value, syncResult>(
//   p: BasicFunc<value, Promise<[syncResult, BasicUpdater<value>]>>,
//   errorProcessor: BasicFunc<any, ErrorPermanenceStatus>,
//   maxAttempts: number,
//   delayBetweenAttemptsInMs: number
// ): Coroutine<Synchronized<value, syncResult>, Synchronized<value, syncResult>, ApiResultStatus> => {
//   const Co = CoTypedFactory<Unit, Synchronized<value, syncResult>>()
//   return Co.SetState(Synchronized.Updaters.sync(AsyncState.Updaters.toReloading())).then(() =>
//     Co.GetState().then((current) =>
//       Co.Await(() => p(current as value), id).then((apiResult) => {
//         if (apiResult.kind == 'l') {
//           return Co.SetState(
//             Synchronized.Updaters.sync<value, syncResult>(AsyncState.Updaters.toLoaded(apiResult.value[0]))
//               .then(Synchronized.Updaters.value<value, syncResult>(apiResult.value[1]))
//               .then((_) => {
//                 return _
//               })
//           ).then(() => Co.Return<ApiResultStatus>('success'))
//         } else if (errorProcessor(apiResult.value) == 'transient failure' && maxAttempts > 0) {
//           return Co.Wait(delayBetweenAttemptsInMs).then(() =>
//             SynchronizeWithValueUpdater(p, errorProcessor, maxAttempts - 1, delayBetweenAttemptsInMs)
//           )
//         } else {
//           return Co.SetState(Synchronized.Updaters.sync(AsyncState.Updaters.toError(apiResult.value))).then(() =>
//             Co.Return<ApiResultStatus>('permanent failure')
//           )
//         }
//       })
//     )
//   )
// }
