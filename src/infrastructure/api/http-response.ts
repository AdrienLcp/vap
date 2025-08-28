import { redirect } from 'next/navigation'

import { DEFAULT_ROUTE, ROUTES } from '@/domain/navigation'
import type { ValueOf } from '@/utils/object-utils'

export const OK_STATUS = 200
export const CREATED_STATUS = 201
export const NO_CONTENT_STATUS = 204
export const BAD_REQUEST_STATUS = 400
export const UNAUTHORIZED_STATUS = 401
export const FORBIDDEN_STATUS = 403
export const NOT_FOUND_STATUS = 404
export const CONFLICT_STATUS = 409
export const UNPROCESSABLE_ENTITY_STATUS = 422
export const INTERNAL_SERVER_ERROR_STATUS = 500

export type OkStatus = typeof OK_STATUS
export type CreatedStatus = typeof CREATED_STATUS
export type NoContentStatus = typeof NO_CONTENT_STATUS
export type BadRequestStatus = typeof BAD_REQUEST_STATUS
export type UnauthorizedStatus = typeof UNAUTHORIZED_STATUS
export type ForbiddenStatus = typeof FORBIDDEN_STATUS
export type NotFoundStatus = typeof NOT_FOUND_STATUS
export type ConflictStatus = typeof CONFLICT_STATUS
export type UnprocessableEntityStatus = typeof UNPROCESSABLE_ENTITY_STATUS
export type InternalServerErrorStatus = typeof INTERNAL_SERVER_ERROR_STATUS

export type SuccessStatus =
  | OkStatus
  | CreatedStatus
  | NoContentStatus

export type ErrorStatus =
  | BadRequestStatus
  | UnauthorizedStatus
  | ForbiddenStatus
  | NotFoundStatus
  | ConflictStatus
  | UnprocessableEntityStatus
  | InternalServerErrorStatus

export type HttpStatus = ErrorStatus | SuccessStatus

type CommonResponse<Status extends HttpStatus> = {
  headers?: HeadersInit
  status: Status
}

export type BaseResponse<Status extends HttpStatus, T = null> = T extends null | undefined
  ? CommonResponse<Status>
  : CommonResponse<Status> & T

export type OkResponse<Data> = BaseResponse<OkStatus, { data: Data }>
export type CreatedResponse<Data> = BaseResponse<CreatedStatus, { data: Data }>
export type NoContentResponse = BaseResponse<NoContentStatus>

export type BadRequestResponse<Issues> = BaseResponse<BadRequestStatus, { issues: Issues }>
export type NotFoundResponse = BaseResponse<NotFoundStatus>
export type UnauthorizedResponse = BaseResponse<UnauthorizedStatus>
export type ForbiddenResponse = BaseResponse<ForbiddenStatus>
export type ConflictResponse<Error> = BaseResponse<ConflictStatus, { error: Error }>
export type UnprocessableEntityResponse<Error> = BaseResponse<UnprocessableEntityStatus, { error: Error }>
export type InternalServerErrorResponse = BaseResponse<InternalServerErrorStatus>

export type Response<T> = T | InternalServerErrorResponse

const ok = <Data>(data: Data, headers?: HeadersInit): OkResponse<Data> => {
  return { data, headers, status: OK_STATUS }
}

const created = <Data>(data: Data, headers?: HeadersInit): CreatedResponse<Data> => {
  return { data, headers, status: CREATED_STATUS }
}

const noContent = (headers?: HeadersInit): NoContentResponse => {
  return { headers, status: NO_CONTENT_STATUS }
}

const badRequest = <Issues>(issues: Issues, headers?: HeadersInit): BadRequestResponse<Issues> => {
  return { headers, issues, status: BAD_REQUEST_STATUS }
}

const unauthorized = (headers?: HeadersInit): UnauthorizedResponse => {
  return { headers, status: UNAUTHORIZED_STATUS }
}

const forbidden = (headers?: HeadersInit): ForbiddenResponse => {
  return { headers, status: FORBIDDEN_STATUS }
}

const conflict = <Error>(error: Error, headers?: HeadersInit): ConflictResponse<Error> => {
  return { error, headers, status: CONFLICT_STATUS }
}

const notFound = (headers?: HeadersInit): NotFoundResponse => {
  return { headers, status: NOT_FOUND_STATUS }
}

const unprocessableEntity = <Error>(error: Error, headers?: HeadersInit): UnprocessableEntityResponse<Error> => {
  return { error, headers, status: UNPROCESSABLE_ENTITY_STATUS }
}

const internalServerError = (headers?: HeadersInit): InternalServerErrorResponse => {
  return { headers, status: INTERNAL_SERVER_ERROR_STATUS }
}

export const HttpResponse = {
  ok,
  created,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  internalServerError
}

export const errorRedirectByStatus = (status: ErrorStatus, fallbackRoute?: ValueOf<typeof ROUTES>) => {
  switch (status) {
    case UNAUTHORIZED_STATUS:
      redirect(ROUTES.unauthorized)
    case FORBIDDEN_STATUS:
      redirect(ROUTES.forbidden)
    case NOT_FOUND_STATUS:
      redirect(ROUTES.notFound)
    default:
      redirect(fallbackRoute ?? DEFAULT_ROUTE)
  }
}
