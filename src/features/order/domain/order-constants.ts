import type { OrderStatus } from '@/features/order/infrastructure/order-schema'

export const ORDER_CONSTANTS = {
  STATUS: [
    'CANCELLED',
    'COMPLETED',
    'PAID',
    'PENDING',
    'SHIPPED'
  ] satisfies OrderStatus[]
} as const

export const ORDER_ERRORS = {}
