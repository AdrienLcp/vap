import type { OrderStatus } from '@/infrastructure/database/generated'

export const ORDER_CONSTANTS = {
  STATUS: ['CANCELLED', 'COMPLETED', 'PAID', 'PENDING', 'SHIPPED'] satisfies OrderStatus[]
} as const

export const ORDER_ERRORS = {}
