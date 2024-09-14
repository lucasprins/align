// TODO : validation modes. can be handled by creating a registerForm and registerField
//        operation on the FormState constructor that adds onBlur and onChange handlers based
//        on the state of the form. might need to save additional fields for this such as hasBeenTouched etc.

// TODO : nested fields using TypeScript . notation type. e.g. registerField()("address.city"), updateField(..)

import { Updater } from '../updater/updater'

export type BaseFormState<T> = {
  isDirty: boolean
  defaultValues: T
  values: T
  dirtyFields: string[]
}

export type FormState<T> =
  | IdleFormState<T>
  | ValidatingFormState<T>
  | InvalidFormState<T>
  | SubmittingFormState<T>
  | SubmittedFormState<T>
  | SubmissionFailedFormState<T>

export type IdleFormState<T> = BaseFormState<T> & { kind: 'idle' }
export type ValidatingFormState<T> = BaseFormState<T> & { kind: 'validating' }
export type InvalidFormState<T> = BaseFormState<T> & { kind: 'invalid'; errors: { [K in keyof T]?: string } }
export type SubmittingFormState<T> = BaseFormState<T> & { kind: 'submitting' }
export type SubmittedFormState<T> = BaseFormState<T> & { kind: 'submitted' }
export type SubmissionFailedFormState<T> = BaseFormState<T> & { kind: 'submissionFailed' }

// utility types
export type FormStateShapeRequirements = Record<string, any>

// assertions
export const isIdle = <T>(state: FormState<T>): state is IdleFormState<T> => state.kind === 'idle'
export const isValidating = <T>(state: FormState<T>): state is ValidatingFormState<T> => state.kind === 'validating'
export const isInvalid = <T>(state: FormState<T>): state is InvalidFormState<T> => state.kind === 'invalid'
export const isSubmitting = <T>(state: FormState<T>): state is SubmittingFormState<T> => state.kind === 'submitting'
export const isSubmitted = <T>(state: FormState<T>): state is SubmittedFormState<T> => state.kind === 'submitted'
export const isSubmissionFailed = <T>(state: FormState<T>): state is SubmissionFailedFormState<T> =>
  state.kind === 'submissionFailed'

export const FormState = {
  Default: {
    idle: <T>(defaultValues: T): IdleFormState<T> => ({
      kind: 'idle',
      isDirty: false,
      defaultValues,
      values: defaultValues,
      dirtyFields: [],
    }),
  },

  Updaters: {
    field:
      <T>() =>
      <F extends keyof T>(field: F, value: T[F]): Updater<FormState<T>> => {
        return Updater((prev) => {
          const isFieldDirty: boolean = value !== prev.defaultValues[field]
          const updatedValues: T = { ...prev.values, [field]: value }

          const dirtyFields = prev.dirtyFields
            .filter((dirtyField) => dirtyField !== field.toString())
            .concat(isFieldDirty ? [field.toString()] : [])

          return {
            ...prev,
            values: updatedValues,
            dirtyFields: dirtyFields,
            isDirty: dirtyFields.length > 0,
          }
        })
      },

    toValidating: <T>(): Updater<FormState<T>> =>
      Updater((_) =>
        FormState.Assert.isInvalid(_) ? { ..._, errors: {}, kind: 'validating' } : { ..._, kind: 'validating' }
      ),
    toInvalid: <T>(errors: { [K in keyof T]?: string }): Updater<FormState<T>> =>
      Updater((_) => ({ ..._, errors, kind: 'invalid' })),
    toSubmitting: <T>(): Updater<FormState<T>> =>
      Updater((_) =>
        FormState.Assert.isInvalid(_) ? { ..._, errors: {}, kind: 'submitting' } : { ..._, kind: 'submitting' }
      ),
    toSubmitted: <T>(): Updater<FormState<T>> => Updater((_) => ({ ..._, kind: 'submitted' })),
    toSubmissionFailed: <T>(): Updater<FormState<T>> => Updater((_) => ({ ..._, kind: 'submissionFailed' })),
  },

  Assert: { isIdle, isValidating, isInvalid, isSubmitting, isSubmitted, isSubmissionFailed },
}

// type DotNotation<T> = {
//   [K in keyof T]: K extends string ? (T[K] extends Record<string, any> ? `${K}.${DotNotation<T[K]>}` : `${K}`) : never
// }[keyof T]

// type FieldAccessor<T> = (field: DotNotation<T>) => any

// const accessField: FieldAccessor<Example> = (field) => {
//   const keys = field.split('.') as (keyof LoginForm | string)[]

//   let result: any = exampleObject

//   for (const key of keys) {
//     result = result[key]
//   }

//   return result
// }

// interface Example {
//   name: string
//   details: {
//     age: number
//     address: {
//       city: string
//       zipcode: number
//     }
//   }
// }

// const exampleObject: Example = {
//   name: 'John Doe',
//   details: {
//     age: 30,
//     address: {
//       city: 'New York',
//       zipcode: 10001,
//     },
//   },
// }

// accessField('details.address.zipcode')
