import { FormState, Updater } from '@align/core'

export const registerFormField =
  <T>(formState: FormState<T>, setState: (updater: Updater<FormState<T>>) => void) =>
  <F extends keyof T>(field: F) => {
    return {
      value: formState.values[field],
      onChange: (value: T[F]) => {
        setState(FormState.Updaters.field<T>()(field, value))
      },
    }
  }
