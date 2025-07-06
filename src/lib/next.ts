import { NextResponse } from 'next/server'

import type { Response } from '@/api/server'

export const nextResponse = async <T>(promise: Promise<Response<T>>) => {
  const response = await promise
  return NextResponse.json(response, { status: response.statusCode })
}
