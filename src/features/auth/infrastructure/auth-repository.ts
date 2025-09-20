import 'server-only'

import { headers as getHeaders } from 'next/headers'

import type { Unauthorized } from '@/domain/entities'
import type { User } from '@/features/auth/domain/auth-entities'
import { auth } from '@/features/auth/infrastructure/auth-lib'
import { failure, type Result, success } from '@/helpers/result'

const findUser = async (): Promise<Result<User, Unauthorized>> => {
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
