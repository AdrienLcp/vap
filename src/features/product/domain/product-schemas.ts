import { z } from 'zod'

import { CategoryDTOSchema, CategoryIdSchema } from '@/features/category/domain/category-schemas'
import { PRODUCT_CONSTANTS, PRODUCT_ERRORS } from '@/features/product/domain/product-constants'

export const ProductIdSchema = z.cuid()

export const ProductCategoryDTOSchema = CategoryDTOSchema.pick({
  id: true,
  imageUrl: true,
  name: true
})

export const ProductDescriptionSchema = z
  .string()
  .trim()
  .max(PRODUCT_CONSTANTS.DESCRIPTION_MAX_LENGTH, PRODUCT_ERRORS.DESCRIPTION_TOO_LONG)

export const ProductDiscountedPriceSchema = z.coerce
  .number()
  .min(PRODUCT_CONSTANTS.MIN_PRICE, PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_LOW)
  .max(PRODUCT_CONSTANTS.MAX_PRICE, PRODUCT_ERRORS.DISCOUNTED_PRICE_TOO_HIGH)

export const ProductImageUrlSchema = z.url({ error: PRODUCT_ERRORS.INVALID_IMAGE_URL })

export const ProductNameSchema = z
  .string()
  .trim()
  .min(1, PRODUCT_ERRORS.NAME_REQUIRED)
  .max(PRODUCT_CONSTANTS.NAME_MAX_LENGTH, PRODUCT_ERRORS.NAME_TOO_LONG)

export const ProductPriceSchema = z.coerce
  .number()
  .min(PRODUCT_CONSTANTS.MIN_PRICE, PRODUCT_ERRORS.PRICE_TOO_LOW)
  .max(PRODUCT_CONSTANTS.MAX_PRICE, PRODUCT_ERRORS.PRICE_TOO_HIGH)

export const ProductSKU = z
  .string()
  .trim()
  .min(1, PRODUCT_ERRORS.SKU_REQUIRED)
  .max(PRODUCT_CONSTANTS.SKU_MAX_LENGTH, PRODUCT_ERRORS.SKU_TOO_LONG)

export const ProductStatusSchema = z.enum(PRODUCT_CONSTANTS.STATUS)

export const ProductStockSchema = z.coerce
  .number()
  .min(PRODUCT_CONSTANTS.MIN_STOCK, PRODUCT_ERRORS.STOCK_TOO_LOW)

export const ProductCreationSchema = z.object({
  categoryId: CategoryIdSchema.optional(),
  description: ProductDescriptionSchema.optional(),
  discountedPrice: ProductPriceSchema.optional(),
  imageUrl: ProductImageUrlSchema.optional().catch(undefined),
  name: ProductNameSchema,
  price: ProductPriceSchema,
  sku: ProductSKU,
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  stock: ProductStockSchema.optional()
})

export const ProductUpdateSchema = z.object({
  categoryId: CategoryIdSchema.optional(),
  description: ProductDescriptionSchema.optional(),
  discountedPrice: ProductPriceSchema.optional(),
  imageUrl: ProductImageUrlSchema.optional().catch(undefined),
  name: ProductNameSchema.optional(),
  price: ProductPriceSchema.optional(),
  salesCount: z.number().optional(),
  sku: ProductSKU.optional(),
  status: ProductStatusSchema.optional(),
  stock: ProductStockSchema.optional()
})

export const ProductSchema = z.object({
  description: ProductDescriptionSchema.nullable(),
  discountedPrice: ProductPriceSchema.nullish(),
  id: ProductIdSchema,
  imageUrl: ProductImageUrlSchema.nullable(),
  name: ProductNameSchema,
  price: ProductPriceSchema,
  salesCount: z.number().catch(0),
  sku: ProductSKU,
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  stock: ProductStockSchema.catch(0)
})

export const ProductDTOSchema = ProductSchema.extend({
  category: ProductCategoryDTOSchema.nullable()
})

export const ProductPublicDTOSchema = ProductDTOSchema.pick({
  category: true,
  description: true,
  discountedPrice: true,
  id: true,
  imageUrl: true,
  name: true,
  price: true,
  status: true,
  stock: true
})

export const ProductFiltersSchema = z.object({
  categoryIds: z.array(CategoryIdSchema).optional().catch(undefined),
  maxPrice: ProductPriceSchema.optional().catch(undefined),
  minPrice: ProductPriceSchema.optional().catch(undefined),
  search: z.string().trim().min(1).optional().catch(undefined),
  status: ProductStatusSchema.optional().catch(undefined)
})
