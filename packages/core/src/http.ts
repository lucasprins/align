import { Func } from './func'

type HttpResultBase = { code?: number }

export type HttpResult<T> =
  | SuccessHttpResult<T>
  | FailedHttpResult<T>
  | UnauthorizedHttpResult<T>
  | NotFoundHttpResult<T>

export type SuccessHttpResult<T> = HttpResultBase & { kind: 'success'; value: T }
export type FailedHttpResult<T> = HttpResultBase & { kind: 'failed' }
export type UnauthorizedHttpResult<T> = HttpResultBase & { kind: 'unauthorized' }
export type NotFoundHttpResult<T> = HttpResultBase & { kind: 'notFound' }

/**
 * Constructors
 */
function success<T>(value: T, code?: number): SuccessHttpResult<T> {
  return { kind: 'success', value, code }
}

function failed<T>(code?: number): FailedHttpResult<T> {
  return { kind: 'failed', code }
}

function unauthorized<T>(code?: number): UnauthorizedHttpResult<T> {
  return { kind: 'unauthorized', code }
}

function notFound<T>(code?: number): NotFoundHttpResult<T> {
  return { kind: 'notFound', code }
}

const httpResultConstructors = { success, failed, unauthorized, notFound }

/**
 * Func's
 */
function toSuccess<T>(value: T): Func<HttpResult<T>, SuccessHttpResult<T>> {
  return Func(() => success(value))
}

function toFailed<T>(): Func<HttpResult<T>, FailedHttpResult<T>> {
  return Func(() => failed())
}

function toUnauthorized<T>(): Func<HttpResult<T>, UnauthorizedHttpResult<T>> {
  return Func(() => unauthorized())
}

function toNotFound<T>(): Func<HttpResult<T>, NotFoundHttpResult<T>> {
  return Func(() => notFound())
}

const httpResultMutations = { toSuccess, toFailed, toUnauthorized, toNotFound }

/**
 * Assertions
 */
function isSuccess<T>(httpResult: HttpResult<T>): httpResult is SuccessHttpResult<T> {
  return httpResult.kind === 'success'
}

function isFailed<T>(httpResult: HttpResult<T>): httpResult is FailedHttpResult<T> {
  return httpResult.kind === 'failed'
}

function isUnauthorized<T>(httpResult: HttpResult<T>): httpResult is UnauthorizedHttpResult<T> {
  return httpResult.kind === 'unauthorized'
}

function isNotFound<T>(httpResult: HttpResult<T>): httpResult is NotFoundHttpResult<T> {
  return httpResult.kind === 'notFound'
}

const httpResultAssertions = { isSuccess, isFailed, isUnauthorized, isNotFound }

/**
 * Utilities
 */
function map<A, B>(f: (x: A) => B) {
  return (httpResult: HttpResult<A>): HttpResult<B> => {
    return isSuccess(httpResult) ? { ...httpResult, value: f(httpResult.value) } : httpResult
  }
}

const httpResultUtilities = { map }

/**
 * `HttpResult` repository object
 */
export const HttpResult = {
  ...httpResultConstructors,
  ...httpResultMutations,
  ...httpResultAssertions,
  ...httpResultUtilities,
}

const x = HttpResult.toSuccess(5).then(HttpResult.map((x) => x + 2))
