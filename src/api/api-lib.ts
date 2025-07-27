'server-only'

import { NextResponse } from 'next/server'

import type { BaseResponse } from '@/api/api-domain'

export const nextResponse = async <Response extends BaseResponse> (promise: Promise<Response>) => {
  const response = await promise
  return NextResponse.json(response, { status: response.statusCode })
}
