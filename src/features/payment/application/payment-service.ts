import 'server-only'

import { AuthService } from '@/features/auth/application/auth-service'
import type {
  PaymentMethodCreationData,
  PaymentMethodId
} from '@/features/payment/domain/payment-entities'
import { PaymentRepository } from '@/features/payment/infrastructure/payment-repository'
import { success } from '@/helpers/result'

const createUserPaymentMethod = async (paymentMethodCreationData: PaymentMethodCreationData) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const createdPaymentMethodResult = await PaymentRepository.createUserPaymentMethod(
    userResult.data.id,
    paymentMethodCreationData
  )

  if (createdPaymentMethodResult.status === 'ERROR') {
    return createdPaymentMethodResult
  }

  const createdPaymentMethod = createdPaymentMethodResult.data

  if (paymentMethodCreationData.isDefault) {
    const defaultPaymentMethodUpdateResult = await PaymentRepository.updateUserDefaultPaymentMethod(
      userResult.data.id,
      createdPaymentMethod.id
    )

    if (defaultPaymentMethodUpdateResult.status === 'ERROR') {
      return defaultPaymentMethodUpdateResult
    }
  }

  return success(createdPaymentMethod)
}

const deleteUserPaymentMethod = async (paymentMethodId: PaymentMethodId) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await PaymentRepository.deleteUserPaymentMethod(userResult.data.id, paymentMethodId)
}

const findUserPaymentMethods = async () => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await PaymentRepository.findUserPaymentMethods(userResult.data.id)
}

export const PaymentService = {
  createUserPaymentMethod,
  deleteUserPaymentMethod,
  findUserPaymentMethods
}
