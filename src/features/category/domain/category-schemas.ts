import { z } from 'zod'

import { CATEGORY_CONSTANTS, CATEGORY_ERRORS } from '@/features/category/domain/category-constants'

export const CategoryIdSchema = z.cuid()

export const CategoryImageUrlSchema = z.url().max(CATEGORY_CONSTANTS.IMAGE_URL_MAX_LENGTH)

export const CategoryNameSchema = z
  .string()
  .trim()
  .min(1, { message: CATEGORY_ERRORS.NAME_REQUIRED })
  .max(CATEGORY_CONSTANTS.NAME_MAX_LENGTH, { message: CATEGORY_ERRORS.NAME_TOO_LONG })

export const CategoryDescriptionSchema = z
  .string()
  .trim()
  .max(CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH)

export const CategoryCreationSchema = z.object({
  description: CategoryDescriptionSchema.optional().catch(undefined),
  imageUrl: CategoryImageUrlSchema.optional().catch(undefined),
  name: CategoryNameSchema
})

export const CategoryUpdateSchema = z.object({
  description: CategoryDescriptionSchema.optional().catch(undefined),
  imageUrl: CategoryImageUrlSchema.optional().catch(undefined),
  name: CategoryNameSchema.optional()
})

export const CategorySchema = z.object({
  description: CategoryDescriptionSchema.nullable(),
  id: CategoryIdSchema,
  imageUrl: CategoryImageUrlSchema.nullable(),
  name: CategoryNameSchema
})

export const CategoryDTOSchema = CategorySchema.extend({
  productCount: z.int()
})
