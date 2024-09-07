declare const __nominal__type: unique symbol

/**
 * @example
 *
 * ```ts
 * type UserId = Nominal<string, 'UserId'>
 * ```
 */
export type Nominal<Type, Identifier> = Type & {
  readonly [__nominal__type]: Identifier
}

export type Guid = Nominal<string, 'Guid'>
export const Guid = (guid: string) => guid as Guid

export type DateTimeString = string
export const DateTimeString = (dateTimeString: string) => dateTimeString as DateTimeString
