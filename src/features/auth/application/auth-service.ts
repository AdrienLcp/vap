import 'server-only'

import type {
  AuthUserDTO,
  AuthUserError,
  User
} from '@/features/auth/domain/auth-entities'
import { getAuthUserPermissionsByRole } from '@/features/auth/domain/auth-permissions'
import { AuthRepository } from '@/features/auth/infrastructure/auth-repository'
import { type Result, success } from '@/helpers/result'

const findUser = async (): Promise<Result<User, AuthUserError>> => {
  const authUserResult = await AuthRepository.findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const user = authUserResult.data

  const authUser: User = {
    email: user.email,
    id: user.id,
    image: user.image,
    name: user.name,
    role: user.role
  }

  return success(authUser)
}

const findUserDTO = async (): Promise<Result<AuthUserDTO, AuthUserError>> => {
  const authUserResult = await findUser()

  if (authUserResult.status === 'ERROR') {
    return authUserResult
  }

  const authUser = authUserResult.data

  const permissions = getAuthUserPermissionsByRole(authUser.role)

  const authUserDTO: AuthUserDTO = {
    email: authUser.email,
    image: authUser.image,
    name: authUser.name,
    permissions
  }

  return success(authUserDTO)
}

export const AuthService = {
  findUser,
  findUserDTO
}
