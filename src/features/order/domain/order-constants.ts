import { orderStatusEnum } from '@/features/order/infrastructure/order-schema'

export const ORDER_CONSTANTS = {
  STATUS: orderStatusEnum.enumValues
} as const

export const ORDER_ERRORS = {}
