import type {
  FailedHttpResult,
  HttpResult,
  NotFoundHttpResult,
  SuccessHttpResult,
  UnauthorizedHttpResult,
} from './'

/**
 * Checks if the result is a success.
 *
 * @template T - The type of the success value.
 *
 * @returns {boolean} True if the result is a success, false otherwise.
 */
export function isSuccess<T>(
  httpResult: HttpResult<T>,
): httpResult is SuccessHttpResult<T> {
  return httpResult.kind === 'success'
}

/**
 * Checks if the result is a failure.
 *
 * @template T - The type of the failure value.
 *
 * @returns {boolean} True if the result is a failure, false otherwise.
 */
export function isFailed<T>(
  httpResult: HttpResult<T>,
): httpResult is FailedHttpResult<T> {
  return httpResult.kind === 'failed'
}

/**
 * Checks if the result is unauthorized.
 *
 * @template T - The type of the unauthorized value.
 *
 * @returns {boolean} True if the result is unauthorized, false otherwise.
 */
export function isUnauthorized<T>(
  httpResult: HttpResult<T>,
): httpResult is UnauthorizedHttpResult<T> {
  return httpResult.kind === 'unauthorized'
}

/**
 * Checks if the result is a not found error.
 *
 * @template T - The type of the not found value.
 *
 * @returns {boolean} True if the result is a not found error, false otherwise.
 */
export function isNotFound<T>(
  httpResult: HttpResult<T>,
): httpResult is NotFoundHttpResult<T> {
  return httpResult.kind === 'notFound'
}