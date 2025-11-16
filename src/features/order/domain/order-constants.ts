import type { OrderStatus } from '@prisma/client'

export const ORDER_CONSTANTS = {
  STATUS: ['CANCELLED', 'COMPLETED', 'PAID', 'PENDING', 'SHIPPED'] satisfies OrderStatus[]
} as const

export const ORDER_ERRORS = {}
