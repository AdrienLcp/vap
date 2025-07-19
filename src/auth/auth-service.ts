import type { Unauthorized } from '@/api/api-domain'
import type { AuthUser } from '@/auth/domain/auth-entities'
import { AuthRepository } from '@/auth/auth-repository'
import { failure, type Result, success } from '@/helpers/result'

const findUser = async (): Promise<Result<Unauthorized, AuthUser>> => {
  const userResult = await AuthRepository.findUser()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  return success(userResult.data)
}

export const AuthService = {
  findUser
}
