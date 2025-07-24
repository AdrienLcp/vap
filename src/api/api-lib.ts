import { NextResponse } from 'next/server'

import type { BaseResponse } from '@/api/api-domain'

export const nextResponse = async <T extends BaseResponse> (promise: Promise<T>) => {
  const response = await promise
  return NextResponse.json(response, { status: response.statusCode })
}
