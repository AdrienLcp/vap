import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  PaymentMethod,
  PaymentMethodCreationData,
  PaymentMethodId,
  PaymentMethodUpdateData
} from '@/features/payment/domain/payment-entities'
import type { UserId } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { type EntitySelectedFields, PaymentMethodDatabase } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const METHOD_PAYMENT_SELECTED_FIELDS = {
  expiryMonth: true,
  expiryYear: true,
  id: true,
  isDefault: true,
  last4: true,
  provider: true,
  type: true
} satisfies EntitySelectedFields<PaymentMethod>

const clearUserDefaultPaymentMethods = async (userId: UserId): Promise<Result> => {
  try {
    await PaymentMethodDatabase.updateMany({
      data: {
        isDefault: false
      },
      where: {
        isDefault: true,
        userId
      }
    })

    return success()
  } catch (error) {
    console.error('Unknown error in PaymentRepository.clearUserDefaultPaymentMethods:', error)
    return failure()
  }
}

const createUserPaymentMethod = async (
  userId: UserId,
  paymentMethodCreationData: PaymentMethodCreationData
): Promise<Result<PaymentMethod>> => {
  try {
    const createdPaymentMethod = await PaymentMethodDatabase.create({
      data: {
        expiryMonth: paymentMethodCreationData.expiryMonth,
        expiryYear: paymentMethodCreationData.expiryYear,
        isDefault: paymentMethodCreationData.isDefault ?? false,
        last4: paymentMethodCreationData.last4,
        name: paymentMethodCreationData.name,
        provider: paymentMethodCreationData.provider,
        type: paymentMethodCreationData.type,
        userId
      },
      select: METHOD_PAYMENT_SELECTED_FIELDS
    })

    return success(createdPaymentMethod)
  } catch (error) {
    console.error('Unknown error in PaymentRepository.createUserPaymentMethod:', error)
    return failure()
  }
}

const deleteUserPaymentMethod = async (
  userId: UserId,
  paymentMethodId: PaymentMethodId
): Promise<Result<null, NotFound>> => {
  try {
    await PaymentMethodDatabase.delete({
      where: { id: paymentMethodId, userId }
    })

    return success()
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'NOT_FOUND':
        return failure('NOT_FOUND')
      default:
        console.error('Unknown error in PaymentRepository.deleteUserPaymentMethod:', error)
        return failure()
    }
  }
}

const deleteUserPaymentMethods = async (userId: UserId): Promise<Result> => {
  try {
    await PaymentMethodDatabase.deleteMany({
      where: { userId }
    })

    return success()
  } catch (error) {
    console.error('Unknown error in PaymentRepository.deleteUserPaymentMethods:', error)
    return failure()
  }
}

const findUserPaymentMethod = async (
  userId: UserId,
  paymentMethodId: PaymentMethodId
): Promise<Result<PaymentMethod, NotFound>> => {
  try {
    const paymentMethod = await PaymentMethodDatabase.findFirst({
      select: METHOD_PAYMENT_SELECTED_FIELDS,
      where: { id: paymentMethodId, userId }
    })

    if (!paymentMethod) {
      return failure('NOT_FOUND')
    }

    return success(paymentMethod)
  } catch (error) {
    console.error('Unknown error in PaymentRepository.findUserPaymentMethod:', error)
    return failure()
  }
}

const findUserPaymentMethods = async (userId: UserId): Promise<Result<PaymentMethod[]>> => {
  try {
    const paymentMethods = await PaymentMethodDatabase.findMany({
      select: METHOD_PAYMENT_SELECTED_FIELDS,
      where: { userId }
    })

    return success(paymentMethods)
  } catch (error) {
    console.error('Unknown error in PaymentRepository.findUserPaymentMethods:', error)
    return failure()
  }
}

const updateUserPaymentMethod = async (
  userId: UserId,
  paymentMethodId: PaymentMethodId,
  updateData: PaymentMethodUpdateData
): Promise<Result<PaymentMethod, NotFound>> => {
  try {
    const updatedPaymentMethod = await PaymentMethodDatabase.update({
      data: {
        expiryMonth: updateData.expiryMonth,
        expiryYear: updateData.expiryYear,
        isDefault: updateData.isDefault ?? undefined,
        last4: updateData.last4,
        provider: updateData.provider,
        type: updateData.type
      },
      select: METHOD_PAYMENT_SELECTED_FIELDS,
      where: { id: paymentMethodId, userId }
    })

    return success(updatedPaymentMethod)
  } catch (error) {
    const databaseError = getDatabaseError(error)

    switch (databaseError.code) {
      case 'NOT_FOUND':
        return failure('NOT_FOUND')
      default:
        console.error('Unknown error in PaymentRepository.updateUserPaymentMethod:', error)
        return failure()
    }
  }
}

export const PaymentRepository = {
  clearUserDefaultPaymentMethods,
  createUserPaymentMethod,
  deleteUserPaymentMethod,
  deleteUserPaymentMethods,
  findUserPaymentMethod,
  findUserPaymentMethods,
  updateUserPaymentMethod
}
