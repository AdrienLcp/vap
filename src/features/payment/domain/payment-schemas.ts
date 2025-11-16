import { z } from 'zod'

import { PAYMENT_METHOD_CONSTANTS } from '@/features/payment/domain/payment-constants'

export const PaymentMethodIdSchema = z.string()

export const CardPaymentMethodTypeSchema = z.enum(PAYMENT_METHOD_CONSTANTS.CARD_PAYMENT_METHOD_TYPES)
export const NonCardPaymentMethodTypeSchema = z.enum(PAYMENT_METHOD_CONSTANTS.NON_CARD_PAYMENT_METHODS_TYPES)

export const PaymentMethodTypeSchema = z.union([
  CardPaymentMethodTypeSchema,
  NonCardPaymentMethodTypeSchema
])

export const PaymentMethodProviderSchema = z.enum(PAYMENT_METHOD_CONSTANTS.PROVIDERS)

export const PaymentMethodExpiryMonthSchema = z
  .int()
  .min(PAYMENT_METHOD_CONSTANTS.MIN_EXPIRY_MONTH)
  .max(PAYMENT_METHOD_CONSTANTS.MAX_EXPIRY_MONTH)

export const PaymentMethodExpiryYearSchema = z
  .int()
  .min(PAYMENT_METHOD_CONSTANTS.MIN_EXPIRY_YEAR)
  .max(PAYMENT_METHOD_CONSTANTS.MAX_EXPIRY_YEAR)

export const PaymentMethodLast4Schema = z
  .string()
  .length(4)
  .regex(/^\d{4}$/)

const BasePaymentMethodSchema = z.object({
  id: PaymentMethodIdSchema,
  isDefault: z.boolean(),
  provider: PaymentMethodProviderSchema
})

const CardPaymentMethodSchema = BasePaymentMethodSchema.extend({
  expiryMonth: PaymentMethodExpiryMonthSchema,
  expiryYear: PaymentMethodExpiryYearSchema,
  last4: PaymentMethodLast4Schema,
  type: CardPaymentMethodTypeSchema
})

const NonCardPaymentMethodSchema = BasePaymentMethodSchema.extend({
  type: NonCardPaymentMethodTypeSchema
})

export const PaymentMethodDTOSchema = z.discriminatedUnion('type', [
  CardPaymentMethodSchema,
  NonCardPaymentMethodSchema
])
