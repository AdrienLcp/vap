import type { ZodError } from 'zod'

import type { BadRequest, Conflict, ErrorResponse, Forbidden, InternalServerError, SuccessResponse, Unauthorized } from '@/infrastructure/api/api-domain'
import { failure, type NotFound, success } from '@/helpers/result'

const OK_STATUS_CODE = 200
const CREATED_STATUS_CODE = 201
const BAD_REQUEST_STATUS_CODE = 400
const UNAUTHORIZED_STATUS_CODE = 401
const FORBIDDEN_STATUS_CODE = 403
const NOT_FOUND_STATUS_CODE = 404
const CONFLICT_STATUS_CODE = 409
const INTERNAL_SERVER_ERROR_STATUS_CODE = 500

function ok(): SuccessResponse
function ok<Data>(data: Data): SuccessResponse<Data>
function ok<Data>(data?: Data) {
  if (data == null) {
    return { ...success(), statusCode: OK_STATUS_CODE }
  }

  return { ...success(data), statusCode: OK_STATUS_CODE }
}

function created(): SuccessResponse
function created<Data>(data: Data): SuccessResponse<Data>
function created<Data>(data?: Data) {
  if (data == null) {
    return { ...success(), statusCode: CREATED_STATUS_CODE }
  }

  return { ...success(data), statusCode: CREATED_STATUS_CODE }
}

function badRequest(): ErrorResponse<BadRequest>
function badRequest<RequestBody, Errors extends ZodError<RequestBody>>(errors: Errors): ErrorResponse<Errors>
function badRequest<RequestBody, Errors extends ZodError<RequestBody>>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('BAD_REQUEST'), statusCode: BAD_REQUEST_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: BAD_REQUEST_STATUS_CODE }
}

function unauthorized(): ErrorResponse<Unauthorized>
function unauthorized<Errors>(errors: Errors): ErrorResponse<Errors>
function unauthorized<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('UNAUTHORIZED'), statusCode: UNAUTHORIZED_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: UNAUTHORIZED_STATUS_CODE }
}

function forbidden(): ErrorResponse<Forbidden>
function forbidden<Errors>(errors: Errors): ErrorResponse<Errors>
function forbidden<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('FORBIDDEN'), statusCode: FORBIDDEN_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: FORBIDDEN_STATUS_CODE }
}

function notFound(): ErrorResponse<NotFound>
function notFound<Errors>(errors: Errors): ErrorResponse<Errors>
function notFound<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('NOT_FOUND'), statusCode: NOT_FOUND_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: NOT_FOUND_STATUS_CODE }
}

function conflict(): ErrorResponse<Conflict>
function conflict<Errors>(errors: Errors): ErrorResponse<Errors>
function conflict<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('CONFLICT'), statusCode: CONFLICT_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: CONFLICT_STATUS_CODE }
}

function internalServerError(): ErrorResponse<InternalServerError>
function internalServerError<Errors>(errors: Errors): ErrorResponse<Errors>
function internalServerError<Errors>(errors?: Errors) {
  if (errors == null) {
    return { ...failure('INTERNAL_SERVER_ERROR'), statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE }
  }

  return { ...failure(errors), statusCode: INTERNAL_SERVER_ERROR_STATUS_CODE }
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
