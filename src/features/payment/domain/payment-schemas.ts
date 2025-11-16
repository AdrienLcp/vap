import { z } from 'zod'

import { PAYMENT_METHOD_CONSTANTS } from '@/features/payment/domain/payment-constants'

export const PaymentMethodIdSchema = z.string()
export const PaymentMethodTypeSchema = z.enum(PAYMENT_METHOD_CONSTANTS.TYPES)
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

export const PaymentMethodDTOSchema = z.object({
  expiryMonth: PaymentMethodExpiryMonthSchema.optional(),
  expiryYear: PaymentMethodExpiryYearSchema.optional(),
  id: PaymentMethodIdSchema,
  isDefault: z.boolean(),
  last4: PaymentMethodLast4Schema.optional(),
  provider: PaymentMethodProviderSchema,
  type: PaymentMethodTypeSchema
})
