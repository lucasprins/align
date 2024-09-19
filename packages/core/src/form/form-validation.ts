export type FormResolver<T> = (values: T) => {
  errors: FormErrors<T>
}

export type FormErrors<T> = {
  [K in keyof T]?: string
}

export const defineFormResolver = <T>(resolverFn: (values: T) => { errors: FormErrors<T> }): FormResolver<T> => {
  return resolverFn
}
