import { FormState, Updater } from '@align/core'
import React from 'react'

import { FormField as FormFieldComponent } from './form-field'

type FormFieldProps<T> = Omit<React.ComponentProps<typeof FormFieldComponent<T>>, 'form' | 'setState'>

export interface FormProps<T> {
  form: FormState<T>
  setState: (updater: Updater<FormState<T>>) => void
  children: (params: { FormField: React.ComponentType<FormFieldProps<T>> }) => React.ReactNode
}

export function Form<T>({ form, setState, children }: FormProps<T>) {
  const FormField = (props: FormFieldProps<T>): React.ReactNode => {
    return <FormFieldComponent {...props} form={form} setState={setState} />
  }

  return children({ FormField })
}
