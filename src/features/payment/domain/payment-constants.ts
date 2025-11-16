import type { PaymentProvider, PaymentType } from '@prisma/client'

const currentYear = new Date().getFullYear()

export const PAYMENT_METHOD_CONSTANTS = {
  CARD_PAYMENT_METHOD_TYPES: ['CREDIT_CARD', 'DEBIT_CARD'] satisfies PaymentType[],
  MAX_EXPIRY_MONTH: 12,
  MAX_EXPIRY_YEAR: currentYear + 20,
  MIN_EXPIRY_MONTH: 1,
  MIN_EXPIRY_YEAR: currentYear,
  NON_CARD_PAYMENT_METHODS_TYPES: ['BANK_TRANSFER', 'PAYPAL'] satisfies PaymentType[],
  PROVIDERS: ['STRIPE'] satisfies PaymentProvider[]
} as const
