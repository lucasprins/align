import { FormState, Updater } from '@align/core'

import { registerFormField } from './register-form-field'

export interface FormFieldProps<T> {
  form: FormState<T>
  field: keyof T
  setState: (updater: Updater<FormState<T>>) => void
  children: (params: { value: T[keyof T]; error?: string; onChange: (value: any) => void }) => React.ReactNode
}

export function FormField<T>({ form, field, setState, children }: FormFieldProps<T>) {
  const { value, onChange } = registerFormField(form, setState)(field)

  const error = FormState.Assert.isInvalid(form) && form.errors[field] ? form.errors[field] : undefined

  const handleChange = (input: any) => {
    if (typeof input === 'object' && 'target' in input) {
      onChange(input.target.value as T[keyof T])
    }

    if (typeof input === 'string' || typeof input === 'boolean') {
      onChange(input as T[keyof T])
    }
  }

  return children({ value, error, onChange: handleChange })
}
