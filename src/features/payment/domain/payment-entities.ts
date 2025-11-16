import type { z } from 'zod'

import type {
  PaymentMethodDTOSchema,
  PaymentMethodProviderSchema
} from '@/features/payment/domain/payment-schemas'

export type PaymentMethod = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type BasePaymentMethod = {
  id: string
  isDefault: boolean
  provider: PaymentMethodProvider
}

export type CardPaymentMethod = BasePaymentMethod & {
  expiryMonth: number
  expiryYear: number
  last4: string
  type: 'CREDIT_CARD' | 'DEBIT_CARD'
}

export type NonCardPaymentMethod = BasePaymentMethod & {
  type: 'PAYPAL' | 'BANK_TRANSFER'
}

export type PaymentMethodDTO = CardPaymentMethod | NonCardPaymentMethod
