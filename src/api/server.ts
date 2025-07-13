import { NextResponse } from 'next/server'
import type { ZodError } from 'zod'

import { ErrorResult, failure, STATUS_SUCCESS, success, SuccessResult, type UnexpectedError } from '@/helpers/result'

type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500

type BaseResponse = { statusCode: StatusCode }

export type ErrorResponse<Errors = undefined> = BaseResponse & ErrorResult<Errors>
export type SuccessResponse<Data = undefined> = BaseResponse & SuccessResult<Data>

export type ApiResponse<Errors = undefined, Data = undefined> =
  | ErrorResponse<Errors>
  | SuccessResponse<Data>

export type ResponseWithValidationIssues<Errors, RequestBody = unknown, Data = undefined> = ApiResponse<Errors | ZodError<RequestBody>, Data>

const OK_STATUS_CODE = 200
const CREATED_STATUS_CODE = 201

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
