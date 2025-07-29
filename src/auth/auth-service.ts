import 'server-only'

import { AuthRepository } from '@/auth/auth-repository'
import type { AuthUserDTO, AuthUserError } from '@/auth/domain/auth-entities'
import { ROLE_PERMISSIONS } from '@/auth/domain/auth-permissions'
import { type Result, success } from '@/helpers/result'
import type { UserRole } from '@/user/user-entities'

const getAuthUserPermissionsByRole = (role: UserRole) => {
  return ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.USER
}

const findUser = async (): Promise<Result<AuthUserError, AuthUserDTO>> => {
  const authUserResult = await AuthRepository.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const authUserPermissions = getAuthUserPermissionsByRole(authUserResult.data.role)

  const authUserDTO: AuthUserDTO = {
    name: authUserResult.data.name,
    permissions: authUserPermissions
  }

  return success(authUserDTO)
}

export const AuthService = {
  findUser
}
