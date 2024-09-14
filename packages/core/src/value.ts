import { BasicUpdater, Updater } from './updater/updater'

export type Value<V> = { value: V }

export const Value = {
  Default: <v>(v: v): Value<v> => ({ value: v }),

  Updaters: {
    value: <v>(_: BasicUpdater<v>): Updater<Value<v>> =>
      Updater<Value<v>>((current) => ({ ...current, value: _(current.value) })),
  },

  Operations: {
    value: <v>(_: Value<v>): v => _.value,
  },
}
