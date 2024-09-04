import { FormState, Updater } from '@align/core'
import React from 'react'

type FieldProps<T> = {
  form: FormState<T>
  setState: (updater: Updater<FormState<T>>) => void
}

export interface FormProps<T> {
  form: FormState<T>
  setState: (updater: Updater<FormState<T>>) => void
  children: (params: { fieldProps: FieldProps<T> }) => React.ReactNode
}

export function Form<T>({ form, setState, children }: FormProps<T>) {
  const fieldProps: FieldProps<T> = { form, setState }

  return children({ fieldProps })
}
