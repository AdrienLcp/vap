import type {
  CardPaymentMethod,
  NonCardPaymentMethod,
  PaymentMethod,
  PaymentMethodDTO
} from '@/features/payment/domain/payment-entities'
import {
  isCardPaymentMethod,
  isNonCardPaymentMethod
} from '@/features/payment/domain/payment-helpers'
import { failure, type Result, success } from '@/helpers/result'

export const toPaymentMethodDTO = (paymentMethod: PaymentMethod): Result<PaymentMethodDTO> => {
  const baseDTO = {
    id: paymentMethod.id,
    isDefault: paymentMethod.isDefault,
    provider: paymentMethod.provider
  }

  if (isCardPaymentMethod(paymentMethod)) {
    const cartPaymentMethod: CardPaymentMethod = {
      ...baseDTO,
      expiryMonth: paymentMethod.expiryMonth,
      expiryYear: paymentMethod.expiryYear,
      last4: paymentMethod.last4,
      type: paymentMethod.type
    }

    return success(cartPaymentMethod)
  }

  if (isNonCardPaymentMethod(paymentMethod)) {
    const nonCardPaymentMethod: NonCardPaymentMethod = {
      ...baseDTO,
      type: paymentMethod.type
    }

    return success(nonCardPaymentMethod)
  }

  return failure()
}
