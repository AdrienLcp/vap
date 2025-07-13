import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

import { type BaseResponse, CREATED_STATUS_CODE, type ErrorResponse, OK_STATUS_CODE } from '@/api/api-domain'
import { failure, STATUS_SUCCESS, success, type UnexpectedError } from '@/helpers/result'

function ok(): { status: typeof STATUS_SUCCESS, statusCode: typeof OK_STATUS_CODE }
function ok<Data>(data: Data): { data: Data, status: typeof STATUS_SUCCESS, statusCode: typeof OK_STATUS_CODE }
function ok<Data>(data?: Data) {
  if (data == null) {
    return { ...success(), statusCode: OK_STATUS_CODE }
  }

  return { ...success(data), statusCode: OK_STATUS_CODE }
}

function created(): { status: typeof STATUS_SUCCESS, statusCode: typeof CREATED_STATUS_CODE }
function created<Data>(data: Data): { data: Data, status: typeof STATUS_SUCCESS, statusCode: typeof CREATED_STATUS_CODE }
function created<Data>(data?: Data) {
  if (data == null) {
    return { ...success(), statusCode: CREATED_STATUS_CODE }
  }

  return { ...success(data), statusCode: CREATED_STATUS_CODE }
}

export function errorResponse(statusCode: number): ErrorResponse
export function errorResponse<Errors>(statusCode: number, errors: Errors): ErrorResponse<Errors>
export function errorResponse<Errors>(statusCode: number, errors?: Errors) {
  if (errors == null) {
    return { ...failure(), statusCode }
  }

  return { ...failure(errors), statusCode }
}

const badRequest = <RequestBody, Errors extends ZodError<RequestBody>>(errors: Errors): ErrorResponse<Errors> => errorResponse(400, errors)

const unauthorized = <Errors>(errors: Errors): ErrorResponse<Errors> => errorResponse(401, errors)

const forbidden = <Errors>(errors: Errors): ErrorResponse<Errors> => errorResponse(403, errors)

const notFound = <Errors>(errors: Errors): ErrorResponse<Errors> => errorResponse(404, errors)

const conflict = <Errors>(errors: Errors): ErrorResponse<Errors> => errorResponse(409, errors)

const internalServerError = <Errors>(errors?: Errors): ErrorResponse<Errors | UnexpectedError> => errorResponse(500, errors)

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

export const nextResponse = async <T extends BaseResponse> (promise: Promise<T>) => {
  const response = await promise
  return NextResponse.json(response, { status: response.statusCode })
}
