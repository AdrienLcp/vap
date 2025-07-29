import 'server-only'

import { headers as getHeaders } from 'next/headers'

import { auth } from '@/auth/auth-lib'
import type { AuthUser } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'
import type { Unauthorized } from '@/infrastructure/api/api-domain'

const findUser = async (): Promise<Result<Unauthorized, AuthUser>> => {
  const headers = await getHeaders()
  const session = await auth.api.getSession({ headers })

  if (!session) {
    return failure('UNAUTHORIZED')
  }

  return success(session.user)
}

export const AuthRepository = {
  findUser
}
