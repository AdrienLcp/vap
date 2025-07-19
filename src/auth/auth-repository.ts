import type { Unauthorized } from '@/api/api-domain'
import type { AuthUser } from '@/auth/domain/auth-entities'
import { failure, type Result, success } from '@/helpers/result'
import { database } from '@/infrastructure/database'
import { auth } from '@/lib/auth'
import { headers as getHeaders } from 'next/headers'

const findUser = async (): Promise<Result<Unauthorized, AuthUser>> => {
  const headers = await getHeaders()

  const session = await auth.api.getSession({ headers })

  if (!session) {
    return failure('UNAUTHORIZED')
  }

  const user = await database.user.findUnique({
    where: { id: session.user.id },
    select: {
      name: true,
      role: true
    }
  })

  if (!user) {
    return failure('UNAUTHORIZED')
  }

  return success(user)
}

export const AuthRepository = {
  findUser
}
