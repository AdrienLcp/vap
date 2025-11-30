import type {
  CardPaymentMethod,
  NonCardPaymentMethod,
  PaymentMethodType
} from '@/features/payment/domain/payment-entities'

type PaymentMethod = {
  type: PaymentMethodType
}

export const isCardPaymentMethod = (
  paymentMethod: PaymentMethod
): paymentMethod is CardPaymentMethod => {
  return paymentMethod.type === 'CREDIT_CARD' || paymentMethod.type === 'DEBIT_CARD'
}

export const isNonCardPaymentMethod = (
  paymentMethod: PaymentMethod
): paymentMethod is NonCardPaymentMethod => {
  return paymentMethod.type === 'BANK_TRANSFER' || paymentMethod.type === 'PAYPAL'
}
