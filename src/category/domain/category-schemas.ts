import { z } from 'zod'

import { CATEGORY_CONSTANTS } from '@/category/domain/category-constants'

export const CategoryIdSchema = z.cuid()

export const CategoryImageUrlSchema = z
  .url()
  .max(CATEGORY_CONSTANTS.IMAGE_URL_MAX_LENGTH)

export const CategoryNameSchema = z
  .string()
  .max(CATEGORY_CONSTANTS.NAME_MAX_LENGTH, { message: CATEGORY_CONSTANTS.NAME_TOO_LONG })

export const CategoryDescriptionSchema = z
  .string()
  .min(1)
  .max(CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH)

export const CategoryCreationSchema = z.object({
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema.optional().catch(undefined),
  imageUrl: CategoryImageUrlSchema.optional().catch(undefined)
})

export const CategoryUpdateSchema = z.object({
  name: CategoryNameSchema.optional(),
  description: CategoryDescriptionSchema.optional().catch(undefined),
  imageUrl: CategoryImageUrlSchema.optional().catch(undefined)
})

export const CategoryDTOSchema = z.object({
  id: CategoryIdSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema.nullable().catch(null),
  imageUrl: CategoryImageUrlSchema.nullable().catch(null)
})
