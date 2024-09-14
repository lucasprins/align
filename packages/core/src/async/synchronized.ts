import { BasicUpdater, Updater } from '../updater/updater'
import { AsyncState } from './async-state'

export type Synchronized<Value, SyncResult> = Value & { sync: AsyncState<SyncResult> }

export const Synchronized = {
  Default: <Value, SyncResult>(
    initialValue: Value,
    sync?: AsyncState<SyncResult>
  ): Synchronized<Value, SyncResult> => ({
    ...initialValue,
    sync: sync ?? AsyncState.unloaded(),
  }),

  Updaters: {
    sync: <Value, SyncResult>(
      updater: BasicUpdater<AsyncState<SyncResult>>
    ): Updater<Synchronized<Value, SyncResult>> =>
      Updater<Synchronized<Value, SyncResult>>((current) => ({
        ...current,
        sync: updater(current.sync),
      })),
    value: <Value, SyncResult>(updater: BasicUpdater<Value>): Updater<Synchronized<Value, SyncResult>> =>
      Updater<Synchronized<Value, SyncResult>>((current) => ({
        ...current,
        ...updater(current),
      })),
  },
}
