import 'server-only'

import type { AuthUserDTO, AuthUserError } from '@/auth/domain/auth-entities'
import { getAuthUserPermissionsByRole } from '@/auth/domain/auth-permissions'
import { AuthRepository } from '@/auth/infrastructure/auth-repository'
import { type Result, success } from '@/helpers/result'

const findUser = async (): Promise<Result<AuthUserError, AuthUserDTO>> => {
  const authUserResult = await AuthRepository.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const authUser = authUserResult.data

  const authUserPermissions = getAuthUserPermissionsByRole(authUser.role)

  const authUserDTO: AuthUserDTO = {
    email: authUser.email,
    image: authUser.image,
    name: authUser.name,
    permissions: authUserPermissions
  }

  return success(authUserDTO)
}

export const AuthService = {
  findUser
}
