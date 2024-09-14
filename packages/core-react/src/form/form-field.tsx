import { FormState, Updater } from '@align/core'

import { registerFormField } from './register-form-field'

export interface FormFieldProps<T, K extends keyof T> {
  form: FormState<T>
  field: K
  setState: (updater: Updater<FormState<T>>) => void
  children: (params: { value: T[K]; error?: string; onChange: (value: any) => void }) => React.ReactNode
}

export function FormField<T, K extends keyof T>({ form, field, setState, children }: FormFieldProps<T, K>) {
  const { value, onChange } = registerFormField(form, setState)(field)

  const error = FormState.Assert.isInvalid(form) && form.errors[field] ? form.errors[field] : undefined

  const handleChange = (input: any) => {
    if (typeof input === 'object' && 'target' in input) {
      onChange(input.target.value as T[K])
    }

    if (typeof input === 'string' || typeof input === 'boolean') {
      onChange(input as T[K])
    }
  }

  return children({ value, error, onChange: handleChange })
}
