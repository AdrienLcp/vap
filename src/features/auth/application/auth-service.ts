import 'server-only'

import type { Unauthorized } from '@/domain/entities'
import { AddressService } from '@/features/address/application/address-service'
import type {
  AuthUserDTO,
  AuthUserError,
  User
} from '@/features/auth/domain/auth-entities'
import { getAuthUserPermissionsByRole } from '@/features/auth/domain/auth-permissions'
import { AuthRepository } from '@/features/auth/infrastructure/auth-repository'
import { CartService } from '@/features/cart/application/cart-service'
import { PaymentService } from '@/features/payment/application/payment-service'
import { failure, type Result, success } from '@/helpers/result'

const deleteUser = async (): Promise<Result<null, Unauthorized>> => {
  try {
    const deletionResults = await Promise.all([
      AddressService.deleteUserAddresses(),
      CartService.clearUserCart(),
      PaymentService.deleteUserPaymentMethods()
    ])

    for (const deletionResult of deletionResults) {
      if (deletionResult.status === 'ERROR') {
        return deletionResult
      }
    }

    return success()
  } catch (error) {
    console.error('Unknown error in AuthService.deleteUser:', error)
    return failure()
  }
}

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
  deleteUser,
  findUser,
  findUserDTO
}
