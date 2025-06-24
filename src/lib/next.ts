import { NextResponse } from 'next/server'

import { ControllerResult } from '@/helpers/controller-result'

type Data<T> = Omit<ControllerResult<T>, 'statusCode'> & {
  statusCode?: number
}

export const nextResponse = <T> (controllerResult: ControllerResult<T>) => {
  const response: Data<T> = { ...controllerResult }
  delete response.statusCode

  return NextResponse.json(response, { status: controllerResult.statusCode  })
}
