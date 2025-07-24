import { headers as getHeaders } from 'next/headers'

import type { Unauthorized } from '@/api/api-domain'
import type { AuthUser } from '@/auth/domain/auth-entities'
import { AuthUserSchema } from '@/auth/domain/auth-schemas'
import { failure, type Result, success } from '@/helpers/result'
import { validate } from '@/helpers/validation'
import { auth } from '@/lib/auth'

const findUser = async (): Promise<Result<Unauthorized, AuthUser>> => {
  const headers = await getHeaders()

  const session = await auth.api.getSession({ headers })

  if (!session) {
    return failure('UNAUTHORIZED')
  }

  const userValidationResult = validate({ data: session.user, schema: AuthUserSchema })

  if (userValidationResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  return success(userValidationResult.data)
}

export const AuthRepository = {
  findUser
}
