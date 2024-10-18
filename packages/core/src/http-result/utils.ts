import type { HttpResult } from './'
import { isSuccess } from './assertions'

/**
 * Transforms the success value of an `HttpResult` using the provided function.
 *
 * If the result is a success (`SuccessHttpResult`), the function `f` is applied to the success value.
 * If the result is a failure (`FailedHttpResult`, `UnauthorizedHttpResult`, `NotFoundHttpResult`), it returns the original result.
 *
 * @template A - The type of the input success value.
 * @template B - The type of the transformed success value.
 *
 * @returns A function that takes an `HttpResult<A>` and returns a transformed `HttpResult<B>`.
 *
 * @example
 * const result = HttpResult.map(x => x + 1)(HttpResult.success(42))
 * console.log(result) // Outputs: { kind: 'success', value: 43 }
 *
 * const failedResult = HttpResult.map(x => x + 1)(HttpResult.failed())
 * console.log(failedResult) // Outputs: { kind: 'failed' }
 */
export function map<A, B>(f: (x: A) => B) {
  return (httpResult: HttpResult<A>): HttpResult<B> => {
    return isSuccess(httpResult)
      ? { ...httpResult, value: f(httpResult.value) }
      : httpResult
  }
}

/**
 * Transforms the success value of an `HttpResult` into another `HttpResult` using the provided function.
 * This allows for chaining operations that may return new `HttpResult`s.
 *
 * If the result is a success (`SuccessHttpResult`), `f` is applied to the success value, which must return another `HttpResult`.
 * If the result is a failure (`FailedHttpResult`, `UnauthorizedHttpResult`, `NotFoundHttpResult`), it returns the original result.
 *
 * @template A - The type of the input success value.
 * @template B - The type of the success value in the transformed `HttpResult`.
 *
 * @returns A function that takes an `HttpResult<A>` and returns a new `HttpResult<B>`.
 *
 * @example
 * const result = HttpResult.flatMap(x => HttpResult.success(x + 1))(HttpResult.success(42))
 * console.log(result) // Outputs: { kind: 'success', value: 43 }
 *
 * const failedResult = HttpResult.flatMap(x => HttpResult.success(x + 1))(HttpResult.failed())
 * console.log(failedResult) // Outputs: { kind: 'failed' }
 */
export function flatMap<A, B>(f: (x: A) => HttpResult<B>) {
  return (httpResult: HttpResult<A>): HttpResult<B> => {
    return isSuccess(httpResult) ? f(httpResult.value) : httpResult
  }
}

/**
 * Handles each possible case of `HttpResult` by applying the appropriate function for each state.
 *
 * This function enables you to define how to handle each case of `HttpResult` in one place.
 *
 * @template A - The type of the success value.
 * @template B - The return type after folding.
 *
 * @returns A function that takes an `HttpResult<A>` and returns a value of type `B`.
 *
 * @example
 * const result = HttpResult.fold(
 *   value => `Success with value: ${value}`,    // Success case
 *   () => 'Operation failed',                   // Failed case
 *   () => 'Unauthorized access',                // Unauthorized case
 *   () => 'Resource not found',                 // NotFound case
 * )(HttpResult.success(42))
 *
 * console.log(result) // Outputs: "Success with value: 42"
 */
export function fold<A, B>(
  onSuccess: (value: A) => B,
  onFailed: () => B,
  onUnauthorized: () => B,
  onNotFound: () => B,
) {
  return (httpResult: HttpResult<A>): B => {
    switch (httpResult.kind) {
      case 'success':
        return onSuccess(httpResult.value)
      case 'failed':
        return onFailed()
      case 'unauthorized':
        return onUnauthorized()
      case 'notFound':
        return onNotFound()
    }
  }
}

/**
 * Simplified version of `fold` that only handles success and generic failure cases.
 *
 * - If the result is a success (`SuccessHttpResult`), `onSuccess` will be called with the success value.
 * - If the result is any failure (`FailedHttpResult`, `UnauthorizedHttpResult`, `NotFoundHttpResult`), `onFailure` will be called.
 *
 * This function provides a simpler interface when specific failure types don't need to be distinguished.
 *
 * @template A - The type of the success value.
 * @template B - The return type after folding.
 *
 * @returns A function that takes an `HttpResult<A>` and returns a value of type `B`.
 *
 * @example
 * const result = HttpResult.foldSimple(
 *   value => `Success with value: ${value}`, // Success case
 *   () => 'Operation failed'                // Generic failure case
 * )(HttpResult.success(42))
 *
 * console.log(result) // Outputs: "Success with value: 42"
 *
 * const failureResult = HttpResult.foldSimple(
 *   value => `Success with value: ${value}`, // Success case
 *   () => 'Operation failed'                // Generic failure case
 * )(HttpResult.failed())
 *
 * console.log(failureResult) // Outputs: "Operation failed"
 */
export function foldSimple<A, B>(
  onSuccess: (value: A) => B,
  onFailure: () => B,
) {
  return (httpResult: HttpResult<A>): B => {
    return isSuccess(httpResult) ? onSuccess(httpResult.value) : onFailure()
  }
}