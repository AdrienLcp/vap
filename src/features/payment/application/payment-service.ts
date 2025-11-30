import 'server-only'

import type { NotFound, Unauthorized } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import type {
  PaymentMethodCreationData,
  PaymentMethodCreationDTO,
  PaymentMethodDTO,
  PaymentMethodId,
  PaymentMethodUpdateData,
  PaymentMethodUpdateDTO
} from '@/features/payment/domain/payment-entities'
import { toPaymentMethodDTO } from '@/features/payment/domain/payment-mappers'
import { PaymentRepository } from '@/features/payment/infrastructure/payment-repository'
import { type Result, success } from '@/helpers/result'

type NotFoundOrUnauthorized = NotFound | Unauthorized

const createUserPaymentMethod = async (
  paymentMethodCreationDto: PaymentMethodCreationDTO
): Promise<Result<PaymentMethodDTO, NotFoundOrUnauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const paymentMethodCreationData: PaymentMethodCreationData = {
    ...paymentMethodCreationDto,
    provider: 'STRIPE'
  }

  const userId = userResult.data.id

  if (paymentMethodCreationData.isDefault) {
    const clearDefaultResult = await PaymentRepository.clearUserDefaultPaymentMethods(userId)

    if (clearDefaultResult.status === 'ERROR') {
      return clearDefaultResult
    }
  }

  const paymentMethodCreationResult = await PaymentRepository.createUserPaymentMethod(
    userResult.data.id,
    paymentMethodCreationData
  )

  if (paymentMethodCreationResult.status === 'ERROR') {
    return paymentMethodCreationResult
  }

  return toPaymentMethodDTO(paymentMethodCreationResult.data)
}

const deleteUserPaymentMethod = async (paymentMethodId: PaymentMethodId) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await PaymentRepository.deleteUserPaymentMethod(userResult.data.id, paymentMethodId)
}

const deleteUserPaymentMethods = async () => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await PaymentRepository.deleteUserPaymentMethods(userResult.data.id)
}

const findUserPaymentMethod = async (
  paymentMethodId: PaymentMethodId
): Promise<Result<PaymentMethodDTO, NotFoundOrUnauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const paymentMethodResult = await PaymentRepository.findUserPaymentMethod(
    userResult.data.id,
    paymentMethodId
  )

  if (paymentMethodResult.status === 'ERROR') {
    return paymentMethodResult
  }

  return toPaymentMethodDTO(paymentMethodResult.data)
}

const findUserPaymentMethods = async (): Promise<Result<PaymentMethodDTO[], Unauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const paymentListResult = await PaymentRepository.findUserPaymentMethods(userResult.data.id)

  if (paymentListResult.status === 'ERROR') {
    return paymentListResult
  }

  const paymentListDTO: PaymentMethodDTO[] = []

  for (const paymentMethod of paymentListResult.data) {
    const paymentMethodDTOResult = toPaymentMethodDTO(paymentMethod)

    if (paymentMethodDTOResult.status === 'ERROR') {
      return paymentMethodDTOResult
    }

    paymentListDTO.push(paymentMethodDTOResult.data)
  }

  return success(paymentListDTO)
}

const setUserDefaultPaymentMethod = async (
  paymentMethodId: PaymentMethodId
): Promise<Result<PaymentMethodDTO[], NotFoundOrUnauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const userId = userResult.data.id

  const paymentMethodsUpdateResult = await PaymentRepository.clearUserDefaultPaymentMethods(userId)

  if (paymentMethodsUpdateResult.status === 'ERROR') {
    return paymentMethodsUpdateResult
  }

  const defaultPaymentMethodUpdateResult = await PaymentRepository.updateUserPaymentMethod(
    userId,
    paymentMethodId,
    { isDefault: true }
  )

  if (defaultPaymentMethodUpdateResult.status === 'ERROR') {
    return defaultPaymentMethodUpdateResult
  }

  const paymentMethodListResult = await PaymentRepository.findUserPaymentMethods(userId)

  if (paymentMethodListResult.status === 'ERROR') {
    return paymentMethodListResult
  }

  const paymentMethodListDTO: PaymentMethodDTO[] = []

  for (const paymentMethod of paymentMethodListResult.data) {
    const paymentMethodDTOResult = toPaymentMethodDTO(paymentMethod)

    if (paymentMethodDTOResult.status === 'ERROR') {
      return paymentMethodDTOResult
    }

    paymentMethodListDTO.push(paymentMethodDTOResult.data)
  }

  return success(paymentMethodListDTO)
}

const updateUserPaymentMethod = async (
  paymentMethodId: PaymentMethodId,
  paymentMethodUpdateData: PaymentMethodUpdateDTO
): Promise<Result<PaymentMethodDTO, NotFoundOrUnauthorized>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const userId = userResult.data.id

  const paymentMethodUpdate: PaymentMethodUpdateData = {
    ...paymentMethodUpdateData,
    provider: 'STRIPE'
  }

  if (paymentMethodUpdate.isDefault) {
    const clearDefaultResult = await PaymentRepository.clearUserDefaultPaymentMethods(userId)

    if (clearDefaultResult.status === 'ERROR') {
      return clearDefaultResult
    }
  }

  const paymentMethodUpdateResult = await PaymentRepository.updateUserPaymentMethod(
    userResult.data.id,
    paymentMethodId,
    paymentMethodUpdate
  )

  if (paymentMethodUpdateResult.status === 'ERROR') {
    return paymentMethodUpdateResult
  }

  return toPaymentMethodDTO(paymentMethodUpdateResult.data)
}

export const PaymentService = {
  createUserPaymentMethod,
  deleteUserPaymentMethod,
  deleteUserPaymentMethods,
  findUserPaymentMethod,
  findUserPaymentMethods,
  setUserDefaultPaymentMethod,
  updateUserPaymentMethod
}
