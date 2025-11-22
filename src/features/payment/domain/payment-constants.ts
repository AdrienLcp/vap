import type { PaymentProvider, PaymentType } from '@prisma/client'

export const PAYMENT_API_BASE_URL = 'payments'

const CURRENT_YEAR = new Date().getFullYear()
export const CARD_PAYMENT_METHOD_TYPES: PaymentType[] = ['CREDIT_CARD', 'DEBIT_CARD']
export const NON_CARD_PAYMENT_METHODS_TYPES: PaymentType[] = ['BANK_TRANSFER', 'PAYPAL']

export const PAYMENT_METHOD_CONSTANTS = {
  MAX_EXPIRY_MONTH: 12,
  MAX_EXPIRY_YEAR: CURRENT_YEAR + 20,
  MIN_EXPIRY_MONTH: 1,
  MIN_EXPIRY_YEAR: CURRENT_YEAR,
  PROVIDERS: ['STRIPE'] satisfies PaymentProvider[],
  TYPES: [...CARD_PAYMENT_METHOD_TYPES, ...NON_CARD_PAYMENT_METHODS_TYPES] satisfies PaymentType[]
} as const

export const PAYMENT_METHOD_ERRORS = {
  INVALID_EXPIRY_DATE: 'INVALID_PAYMENT_METHOD_EXPIRY_DATE',
  INVALID_LAST4: 'INVALID_PAYMENT_METHOD_LAST4'
}
