import { z } from 'zod'

import { CategoryDTOSchema, CategoryIdSchema } from '@/category/domain/category-schemas'
import { PRODUCT_CONSTANTS } from '@/product/domain/product-constants'

export const ProductIdSchema = z.cuid()

export const ProductStatusSchema = z.enum(PRODUCT_CONSTANTS.STATUS)
export const ProductNameSchema = z.string().min(1)
export const ProductStockSchema = z.int().min(PRODUCT_CONSTANTS.MIN_STOCK)

export const ProductCategoryDTOSchema = CategoryDTOSchema.pick({
  name: true,
  imageUrl: true
})

export const ProductSKU = z
  .string()
  .min(1)
  .max(PRODUCT_CONSTANTS.SKU_MAX_LENGTH)

export const ProductPriceSchema = z
  .number()
  .min(PRODUCT_CONSTANTS.MIN_PRICE)
  .max(PRODUCT_CONSTANTS.MAX_PRICE)

export const ProductCreationSchema = z.object({
  name: ProductNameSchema,
  sku: ProductSKU,
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  price: ProductPriceSchema,
  discountedPrice: ProductPriceSchema.optional(),
  description: z.string().optional(),
  stock: ProductStockSchema.optional(),
  imageUrl: z.url().optional(),
  categoryId: CategoryIdSchema.optional()
})

export const ProductUpdateSchema = z.object({
  name: ProductNameSchema.optional(),
  sku: ProductSKU.optional(),
  status: ProductStatusSchema.optional(),
  price: ProductPriceSchema.optional(),
  discountedPrice: ProductPriceSchema.optional(),
  description: z.string().optional(),
  stock: ProductStockSchema.optional(),
  imageUrl: z.url().optional(),
  categoryId: CategoryIdSchema.optional(),
  salesCount: z.number().optional()
})

export const ProductDTOSchema = z.object({
  id: ProductIdSchema,
  name: ProductNameSchema,
  sku: ProductSKU,
  description: z.string().nullable(),
  price: ProductPriceSchema,
  discountedPrice: ProductPriceSchema.nullish(),
  status: ProductStatusSchema.catch(PRODUCT_CONSTANTS.DEFAULT_STATUS),
  stock: ProductStockSchema.catch(0),
  imageUrl: z.url().nullable(),
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
