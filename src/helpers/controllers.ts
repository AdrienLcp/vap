import { STATUS_ERROR, STATUS_SUCCESS } from '@/helpers/result'

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

export function okResult(): { status: typeof STATUS_SUCCESS, statusCode: 200 }
export function okResult<T>(data: T): { data: T, status: typeof STATUS_SUCCESS, statusCode: 200 }
export function okResult<T>(data?: T) {
  if (data == null) {
    return { status: STATUS_SUCCESS, statusCode: 200 }
  }

  return { data, status: STATUS_SUCCESS, statusCode: 200 }
}

export function createdResult(): { status: typeof STATUS_SUCCESS, statusCode: 201 }
export function createdResult<T>(data: T): { data: T, status: typeof STATUS_SUCCESS, statusCode: 201 }
export function createdResult<T>(data?: T) {
  if (data == null) {
    return { status: STATUS_SUCCESS, statusCode: 201 }
  }

  return { data, status: STATUS_SUCCESS, statusCode: 201 }
}

export const badRequestResult = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 400
})

export const unauthorizedResult = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 401
})

export const forbiddenResult = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 403
})

export const notFoundResult = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 404
})

export const internalServerErrorResult = <E>(errors: E): ControllerErrorResult<E> => ({
  errors,
  status: STATUS_ERROR,
  statusCode: 500
})
