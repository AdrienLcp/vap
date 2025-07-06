import type { ZodIssue } from 'zod'

import { type NotFound, STATUS_ERROR, STATUS_SUCCESS, type UnexpectedError } from '@/helpers/result'

export type ControllerErrorResult<E> = {
  errors: E,
  status: typeof STATUS_ERROR,
  statusCode: number
}

export type ControllerSuccessResult<T = undefined> = T extends undefined | null
  ? { status: typeof STATUS_SUCCESS, statusCode: number }
  : { data: T, status: typeof STATUS_SUCCESS, statusCode: number }

export type ControllerResult<E, T = undefined> =
  | ControllerErrorResult<E>
  | ControllerSuccessResult<T>

export type ControllerResultWithValidationIssues<E, T = undefined> = ControllerResult<E | ZodIssue[], T>

function ok(): { status: typeof STATUS_SUCCESS, statusCode: 200 }
function ok<T>(data: T): { data: T, status: typeof STATUS_SUCCESS, statusCode: 200 }
function ok<T>(data?: T) {
  if (data == null) {
    return { status: STATUS_SUCCESS, statusCode: 200 }
  }

  return { data, status: STATUS_SUCCESS, statusCode: 200 }
}

function created(): { status: typeof STATUS_SUCCESS, statusCode: 201 }
function created<T>(data: T): { data: T, status: typeof STATUS_SUCCESS, statusCode: 201 }
function created<T>(data?: T) {
  if (data == null) {
    return { status: STATUS_SUCCESS, statusCode: 201 }
  }

  return { data, status: STATUS_SUCCESS, statusCode: 201 }
}

const badRequest = <E extends ZodIssue[]>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 400
})

const unauthorized = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 401
})

const forbidden = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 403
})

const notFound = <E>(errors?: E): ControllerErrorResult<E | NotFound> => ({
  errors: errors ?? 'NOT_FOUND',
  status: STATUS_ERROR,
  statusCode: 404
})

const conflict = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 409
})

const internalServerError = <E>(errors?: E): ControllerErrorResult<E | UnexpectedError> => ({
  errors: errors ?? 'UNEXPECTED_ERROR',
  status: STATUS_ERROR,
  statusCode: 500
})

export const HttpResponse = {
  ok,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  internalServerError
}
