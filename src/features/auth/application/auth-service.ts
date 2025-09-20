import 'server-only'

import type { AuthUser, AuthUserDTO, AuthUserError } from '@/features/auth/domain/auth-entities'
import { getAuthUserPermissionsByRole } from '@/features/auth/domain/auth-permissions'
import { AuthRepository } from '@/features/auth/infrastructure/auth-repository'
import { type Result, success } from '@/helpers/result'

const findUser = async (): Promise<Result<AuthUser, AuthUserError>> => {
  const authUserResult = await AuthRepository.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const user = authUserResult.data

  const userPermissions = getAuthUserPermissionsByRole(user.role)

  const authUser: AuthUser = {
    id: user.id,
    email: user.email,
    image: user.image,
    name: user.name,
    permissions: userPermissions
  }

  return success(authUser)
}

const findUserDTO = async (): Promise<Result<AuthUserDTO, AuthUserError>> => {
  const authUserResult = await findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const authUser = authUserResult.data

  const authUserDTO: AuthUserDTO = {
    email: authUser.email,
    image: authUser.image,
    name: authUser.name,
    permissions: authUser.permissions
  }

  return success(authUserDTO)
}

export const AuthService = {
  findUser,
  findUserDTO
}
