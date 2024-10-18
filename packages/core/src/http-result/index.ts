import * as httpResultAssertions from './assertions'
import * as httpResultConstructors from './constructors'
import * as httpResultUtilities from './utils'

type HttpResultBase = { code?: number }

/**
 * Union type representing the possible outcomes of an HTTP operation.
 * It can be a success, failure, unauthorized, or not found result.
 *
 * @template T - The type of the success value.
 */
export type HttpResult<T> =
  | SuccessHttpResult<T>
  | FailedHttpResult<T>
  | UnauthorizedHttpResult<T>
  | NotFoundHttpResult<T>

/**
 * Represents a successful HTTP result with a value.
 *
 * @template T - The type of the success value.
 */
export type SuccessHttpResult<T> = HttpResultBase & {
  kind: 'success'
  value: T
}

/**
 * Represents a failed HTTP result.
 */
export type FailedHttpResult<T> = HttpResultBase & { kind: 'failed' }

/**
 * Represents an unauthorized HTTP result.
 */
export type UnauthorizedHttpResult<T> = HttpResultBase & {
  kind: 'unauthorized'
}

/**
 * Represents a not found HTTP result.
 */
export type NotFoundHttpResult<T> = HttpResultBase & { kind: 'notFound' }

/**
 * A utility object for working with `HttpResult` types, including constructors, assertions, and functional utilities.
 *
 * `HttpResult` represents the result of an HTTP operation, which can be one of the following types:
 * - `SuccessHttpResult<T>`: Represents a successful HTTP result, with a value of type `T`.
 * - `FailedHttpResult<T>`: Represents a generic failure result.
 * - `UnauthorizedHttpResult<T>`: Represents a failure due to unauthorized access.
 * - `NotFoundHttpResult<T>`: Represents a failure due to a resource not being found.
 *
 * @template T - The type of the success value in the `HttpResult`.
 */
export const HttpResult = {
  ...httpResultConstructors,
  ...httpResultAssertions,
  ...httpResultUtilities,
}