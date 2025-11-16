import type { PaymentProvider, PaymentType } from '@prisma/client'

const currentYear = new Date().getFullYear()

export const PAYMENT_METHOD_CONSTANTS = {
  MAX_EXPIRY_MONTH: 12,
  MAX_EXPIRY_YEAR: currentYear + 20,
  MIN_EXPIRY_MONTH: 1,
  MIN_EXPIRY_YEAR: currentYear,
  PROVIDERS: ['STRIPE'] satisfies PaymentProvider[],
  TYPES: ['BANK_TRANSFER', 'CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL'] satisfies PaymentType[]
} as const
