import 'server-only'

import { NextResponse } from 'next/server'

import {
  BAD_REQUEST_STATUS,
  type BadRequestResponse,
  CONFLICT_STATUS,
  type ConflictResponse,
  CREATED_STATUS,
  type CreatedResponse,
  type ForbiddenResponse,
  type InternalServerErrorResponse,
  type NoContentResponse,
  type NotFoundResponse,
  OK_STATUS,
  type OkResponse,
  type UnauthorizedResponse,
  UNPROCESSABLE_ENTITY_STATUS,
  type UnprocessableEntityResponse
} from '@/infrastructure/api/http-response'

type ApiResponse<Data = unknown, Error = unknown> =
  | OkResponse<Data>
  | CreatedResponse<Data>
  | NoContentResponse
  | BadRequestResponse<Error>
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
  | ConflictResponse<Error>
  | UnprocessableEntityResponse<Error>
  | InternalServerErrorResponse

const hasData = <Response extends ApiResponse>(response: Response): response is Response & { data: object } => {
  return (response.status === OK_STATUS || response.status === CREATED_STATUS) && response.data != null
}

const hasError = <Response extends ApiResponse> (response: Response): response is Response & { error: object } => {
  return (response.status === CONFLICT_STATUS || response.status === UNPROCESSABLE_ENTITY_STATUS) && response.error != null
}

const hasIssues = <Response extends ApiResponse> (response: Response): response is Response & { issues: object } => {
  return response.status === BAD_REQUEST_STATUS && response.issues != null
}

export const nextResponse = async <Response extends ApiResponse> (promise: Promise<Response>) => {
  try {
    const response = await promise

    const { headers, status } = response

    if (hasData(response)) {
      return NextResponse.json({ data: response.data }, { headers, status })
    }

    if (hasIssues(response)) {
      return NextResponse.json({ issues: response.issues }, { headers, status })
    }

    if (hasError(response)) {
      return NextResponse.json({ error: response.error }, { headers, status })
    }

    return new NextResponse(null, { headers, status })
  } catch (error) {
    console.error('Error in nextResponse:', error)
    return new NextResponse(null, { status: 500 })
  }
}
