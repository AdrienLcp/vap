import type { ProductStatus } from '@prisma/client'

export const PRODUCT_API_BASE_URL = 'products'

export const PRODUCT_CONSTANTS = {
  DEFAULT_STATUS: 'INACTIVE' satisfies ProductStatus,
  DESCRIPTION_MAX_LENGTH: 500,
  IMAGE_SIZE_IN_PX: 220,
  IMAGE_SMALL_SIZE_IN_PX: 80,
  MAX_PRICE: 10000,
  MIN_PRICE: 0.01,
  MIN_STOCK: 0,
  NAME_MAX_LENGTH: 100,
  SKU_MAX_LENGTH: 50,
  SKU_MIN_LENGTH: 1,
  STATUS: ['ACTIVE', 'INACTIVE', 'FEATURED'] satisfies ProductStatus[]
} as const

export const PRODUCT_ERRORS = {
  DESCRIPTION_TOO_LONG: 'DESCRIPTION_TOO_LONG',

  DISCOUNTED_PRICE_TOO_HIGH: 'DISCOUNTED_PRICE_TOO_HIGH',
  DISCOUNTED_PRICE_TOO_LOW: 'DISCOUNTED_PRICE_TOO_LOW',

  IMAGE_URL_INVALID: 'IMAGE_URL_INVALID',

  NAME_REQUIRED: 'NAME_REQUIRED',
  NAME_TOO_LONG: 'NAME_TOO_LONG',

  PRICE_TOO_HIGH: 'PRICE_TOO_HIGH',
  PRICE_TOO_LOW: 'PRICE_TOO_LOW',

  SKU_REQUIRED: 'SKU_REQUIRED',
  SKU_TOO_LONG: 'SKU_TOO_LONG',

  STOCK_TOO_LOW: 'STOCK_TOO_LOW'
} as const

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
