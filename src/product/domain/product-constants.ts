import type { ProductStatus } from '@prisma/client'

export const PRODUCT_CONSTANTS = {
  NAME_MAX_LENGTH: 100,

  DESCRIPTION_MAX_LENGTH: 500,

  IMAGE_SIZE_IN_PX: 400,

  MAX_PRICE: 10000,
  MIN_PRICE: 0.01,

  MIN_STOCK: 0,
  SKU_MAX_LENGTH: 50,

  DEFAULT_STATUS: 'INACTIVE' satisfies ProductStatus,
  STATUS: ['ACTIVE', 'INACTIVE', 'FEATURED'] satisfies ProductStatus[]
} as const

export const PRODUCT_API_BASE_URL = 'products'

export const PRODUCT_FORM_FIELDS = {
  CATEGORY_ID: 'product-category-id',
  DESCRIPTION: 'product-description',
  DISCOUNTED_PRICE: 'product-discounted-price',
  IMAGE_URL: 'product-image-url',
  NAME: 'product-name',
  PRICE: 'product-price',
  SKU: 'product-sku',
  STATUS: 'product-status',
  STOCK: 'product-stock'
} as const
