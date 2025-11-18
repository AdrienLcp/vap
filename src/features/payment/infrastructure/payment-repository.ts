import 'server-only'

import type { PaymentMethod } from '@prisma/client'

import type {
  PaymentMethodCreationData,
  PaymentMethodDTO,
  PaymentMethodId
} from '@/features/payment/domain/payment-entities'
import type { UserId } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { type EntitySelectedFields, PaymentMethodDatabase } from '@/infrastructure/database'

const METHOD_PAYMENT_SELECTED_FIELDS = {
  expiryMonth: true,
  expiryYear: true,
  id: true,
  isDefault: true,
  last4: true,
  provider: true,
  type: true
} satisfies EntitySelectedFields<PaymentMethod>

const createUserPaymentMethod = async (
  userId: UserId,
  paymentMethodCreationData: PaymentMethodCreationData
): Promise<Result<PaymentMethodDTO>> => {
  try {
    const createdPaymentMethod = await PaymentMethodDatabase.create({
      data: {},
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
): Promise<Result> => {
  try {
    await PaymentMethodDatabase.delete({ where: { id: paymentMethodId, userId } })
    return success()
  } catch (error) {
    console.error('Unknown error in PaymentRepository.deleteUserPaymentMethod:', error)
    return failure()
  }
}

export const PaymentRepository = {
  createUserPaymentMethod,
  deleteUserPaymentMethod
}
