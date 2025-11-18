import { z } from 'zod'

import {
  CARD_PAYMENT_METHOD_TYPES,
  NON_CARD_PAYMENT_METHODS_TYPES,
  PAYMENT_METHOD_CONSTANTS,
  PAYMENT_METHOD_ERRORS
} from '@/features/payment/domain/payment-constants'

export const PaymentMethodIdSchema = z.cuid()
export const PaymentMethodProviderSchema = z.enum(PAYMENT_METHOD_CONSTANTS.PROVIDERS)
export const CardPaymentMethodTypeSchema = z.enum(CARD_PAYMENT_METHOD_TYPES)
export const NonCardPaymentMethodTypeSchema = z.enum(NON_CARD_PAYMENT_METHODS_TYPES)
export const PaymentMethodTypeSchema = z.union([
  CardPaymentMethodTypeSchema,
  NonCardPaymentMethodTypeSchema
])

export const PaymentMethodExpiryMonthSchema = z
  .int()
  .min(PAYMENT_METHOD_CONSTANTS.MIN_EXPIRY_MONTH, PAYMENT_METHOD_ERRORS.INVALID_EXPIRY_DATE)
  .max(PAYMENT_METHOD_CONSTANTS.MAX_EXPIRY_MONTH, PAYMENT_METHOD_ERRORS.INVALID_EXPIRY_DATE)

export const PaymentMethodExpiryYearSchema = z
  .int()
  .min(PAYMENT_METHOD_CONSTANTS.MIN_EXPIRY_YEAR, PAYMENT_METHOD_ERRORS.INVALID_EXPIRY_DATE)
  .max(PAYMENT_METHOD_CONSTANTS.MAX_EXPIRY_YEAR, PAYMENT_METHOD_ERRORS.INVALID_EXPIRY_DATE)

export const PaymentMethodLast4Schema = z
  .string()
  .trim()
  .regex(/^\d{4}$/, PAYMENT_METHOD_ERRORS.INVALID_LAST4)

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

export const PaymentMethodCreationSchema = z.object({
  isDefault: z.boolean().nullish(),
})
