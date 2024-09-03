export type Stringify<T extends number> = `${T}`

export type StringifyWithNegatives<T> = T extends number
  ? T extends 0
    ? Stringify<T>
    : Stringify<T> | `-${Stringify<T>}`
  : never
