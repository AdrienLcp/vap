import type { ZodError } from 'zod'

import type { Conflict, ErrorResponse } from '@/infrastructure/api/api-domain'

const OK_STATUS_CODE = 200
const CREATED_STATUS_CODE = 201
const BAD_REQUEST_STATUS_CODE = 400
const UNAUTHORIZED_STATUS_CODE = 401
const FORBIDDEN_STATUS_CODE = 403
const NOT_FOUND_STATUS_CODE = 404
const CONFLICT_STATUS_CODE = 409
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500

type OkResponse<Data = null> = Data extends null | undefined
  ? { statusCode: typeof OK_STATUS_CODE }
  : { data: Data; statusCode: typeof OK_STATUS_CODE }

type CreatedResponse<Data = null> = Data extends null | undefined
  ? { statusCode: typeof CREATED_STATUS_CODE }
  : { data: Data; statusCode: typeof CREATED_STATUS_CODE }

type BadRequestResponse<Request> = { error: ZodError<Request>; statusCode: typeof BAD_REQUEST_STATUS_CODE }
type NotFoundResponse = { statusCode: typeof NOT_FOUND_STATUS_CODE }
type UnauthorizedResponse = { statusCode: typeof UNAUTHORIZED_STATUS_CODE }
type ForbiddenResponse = { statusCode: typeof FORBIDDEN_STATUS_CODE }
type InternalServerErrorResponse = { statusCode: typeof INTERNAL_SERVER_ERROR_STATUS_CODE }

function ok(): OkResponse
function ok<Data>(data: Data): OkResponse<Data>
function ok<Data>(data?: Data) {
  if (data == null) {
    return { statusCode: OK_STATUS_CODE }
  }

  return { data, statusCode: OK_STATUS_CODE }
}

function created(): CreatedResponse
function created<Data>(data: Data): CreatedResponse<Data>
function created<Data>(data?: Data) {
  if (data == null) {
    return { statusCode: CREATED_STATUS_CODE }
  }

  return { data, statusCode: CREATED_STATUS_CODE }
}

const badRequest = <Request>(error: ZodError<Request>): BadRequestResponse<Request> => {
  return { error, statusCode: BAD_REQUEST_STATUS_CODE }
}

const notFound = (): NotFoundResponse => {
  return { statusCode: NOT_FOUND_STATUS_CODE }
}

const unauthorized = (): UnauthorizedResponse => {
  return { statusCode: UNAUTHORIZED_STATUS_CODE }
}

const forbidden = (): ForbiddenResponse => {
  return { statusCode: FORBIDDEN_STATUS_CODE }
}

function conflict(): ErrorResponse<Conflict>
function conflict<Errors>(errors: Errors): ErrorResponse<Errors>
function conflict<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('CONFLICT'), statusCode: CONFLICT_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: CONFLICT_STATUS_CODE }
}

const internalServerError = (): InternalServerErrorResponse => {
  return { statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE }
}

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
