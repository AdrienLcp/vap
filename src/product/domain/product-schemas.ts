import { z } from 'zod'

import { CategoryDTOSchema, CategoryIdSchema } from '@/category/domain/category-schemas'
import { PRODUCT_CONSTANTS, PRODUCT_ERRORS } from '@/product/domain/product-constants'

export const ProductIdSchema = z.cuid()

export const ProductCategoryDTOSchema = CategoryDTOSchema.pick({
  id: true,
  imageUrl: true,
  name: true
})

export const ProductDescriptionSchema = z
  .string()
  .max(PRODUCT_CONSTANTS.DESCRIPTION_MAX_LENGTH, PRODUCT_ERRORS.DESCRIPTION_TOO_LONG)

export const ProductDiscountedPriceSchema = z
  .number()
  .min(PRODUCT_CONSTANTS.MIN_PRICE, PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_LOW)
  .max(PRODUCT_CONSTANTS.MAX_PRICE, PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_HIGH)

export const ProductImageUrlSchema = z.url({ error : PRODUCT_ERRORS.IMAGE_URL_INVALID })

export const ProductNameSchema = z
  .string()
  .min(1, PRODUCT_ERRORS.NAME_REQUIRED)
  .max(PRODUCT_CONSTANTS.NAME_MAX_LENGTH, PRODUCT_ERRORS.NAME_TOO_LONG)

export const ProductPriceSchema = z
  .number()
  .min(PRODUCT_CONSTANTS.MIN_PRICE, PRODUCT_ERRORS.PRICE_TOO_LOW)
  .max(PRODUCT_CONSTANTS.MAX_PRICE, PRODUCT_ERRORS.PRICE_TOO_HIGH)

export const ProductSKU = z
  .string()
  .min(1, PRODUCT_ERRORS.SKU_REQUIRED)
  .max(PRODUCT_CONSTANTS.SKU_MAX_LENGTH, PRODUCT_ERRORS.SKU_TOO_LONG)

export const ProductStatusSchema = z.enum(PRODUCT_CONSTANTS.STATUS)

export const ProductStockSchema = z
  .int()
  .min(PRODUCT_CONSTANTS.MIN_STOCK, PRODUCT_ERRORS.STOCK_TOO_LOW)

export const ProductCreationSchema = z.object({
  name: ProductNameSchema,
  sku: ProductSKU,
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  price: ProductPriceSchema,
  discountedPrice: ProductPriceSchema.optional(),
  description: ProductDescriptionSchema.optional(),
  stock: ProductStockSchema.optional(),
  imageUrl: ProductImageUrlSchema.optional(),
  categoryId: CategoryIdSchema.optional()
})

export const ProductUpdateSchema = z.object({
  name: ProductNameSchema.optional(),
  sku: ProductSKU.optional(),
  status: ProductStatusSchema.optional(),
  price: ProductPriceSchema.optional(),
  discountedPrice: ProductPriceSchema.optional(),
  description: ProductDescriptionSchema.optional(),
  stock: ProductStockSchema.optional(),
  imageUrl: ProductImageUrlSchema.optional(),
  categoryId: CategoryIdSchema.optional(),
  salesCount: z.number().optional()
})

export const ProductDTOSchema = z.object({
  id: ProductIdSchema,
  name: ProductNameSchema,
  sku: ProductSKU,
  description: ProductDescriptionSchema.nullable(),
  price: ProductPriceSchema,
  discountedPrice: ProductPriceSchema.nullish(),
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  stock: ProductStockSchema.catch(0),
  imageUrl: ProductImageUrlSchema.nullable(),
  category: ProductCategoryDTOSchema.nullable(),
  salesCount: z.number().catch(0)
})

export const ProductPublicDTOSchema = ProductDTOSchema.pick({
  id: true,
  name: true,
  sku: true,
  description: true,
  price: true,
  discountedPrice: true,
  status: true,
  stock: true,
  imageUrl: true,
  category: true
})
