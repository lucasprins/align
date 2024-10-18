import type {
  FailedHttpResult,
  NotFoundHttpResult,
  SuccessHttpResult,
  UnauthorizedHttpResult,
} from './'

/**
 * Constructs a successful HTTP result.
 *
 * @template T - The type of the success value.

 * @returns {SuccessHttpResult<T>} A success result.
 */
export function success<T>(value: T, code?: number): SuccessHttpResult<T> {
  return { kind: 'success', value, code }
}

/**
 * Constructs a failed HTTP result.
 *
 * @returns {FailedHttpResult<T>} A failed result.
 */
export function failed<T>(code?: number): FailedHttpResult<T> {
  return { kind: 'failed', code }
}

/**
 * Constructs an unauthorized HTTP result.
 *
 * @returns {UnauthorizedHttpResult<T>} An unauthorized result.
 */
export function unauthorized<T>(code?: number): UnauthorizedHttpResult<T> {
  return { kind: 'unauthorized', code }
}

/**
 * Constructs a not found HTTP result.
 *
 * @returns {NotFoundHttpResult<T>} A not found result.
 */
export function notFound<T>(code?: number): NotFoundHttpResult<T> {
  return { kind: 'notFound', code }
}