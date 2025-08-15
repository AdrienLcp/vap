import type { ProductStatus } from '@prisma/client'

export const PRODUCT_CONSTANTS = {
  MIN_PRICE: 0.01,
  MAX_PRICE: 10000,
  MIN_STOCK: 0,
  SKU_MAX_LENGTH: 50,

  DEFAULT_STATUS: 'INACTIVE' satisfies ProductStatus,
  STATUS: ['ACTIVE', 'INACTIVE', 'FEATURED'] satisfies ProductStatus[]
} as const

export const PRODUCT_API_BASE_URL = '/products'
