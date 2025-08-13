import 'server-only'

import { NextResponse } from 'next/server'

import { type ApiResponse, BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS, OK_STATUS, UNPROCESSABLE_ENTITY_STATUS } from '@/infrastructure/api/http-response'

const hasData = <Response extends ApiResponse>(response: Response): response is Response & { data: object } => {
  return (response.status === OK_STATUS || response.status === CREATED_STATUS) && response.data != null
}

const hasError = <Response extends ApiResponse> (response: Response): response is Response & { error: object } => {
  return (response.status === BAD_REQUEST_STATUS || response.status === CONFLICT_STATUS || response.status === UNPROCESSABLE_ENTITY_STATUS) && response.error != null
}

export const nextResponse = async <Response extends ApiResponse> (promise: Promise<Response>) => {
  try {
    const response = await promise

    const { headers, status } = response

    if (hasData(response)) {
      return NextResponse.json(response.data, { headers, status })
    }

    if (hasError(response)) {
      return NextResponse.json(response.error, { headers, status })
    }

    return new NextResponse(null, { headers, status })
  } catch (error) {
    console.error('Error in nextResponse:', error)
    return new NextResponse(null, { status: 500 })
  }
}
