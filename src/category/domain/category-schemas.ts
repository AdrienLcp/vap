import z from 'zod'

export const CategoryIdSchema = z.cuid()
export const CategoryNameSchema = z.string().min(1)
export const CategoryDescriptionSchema = z.string()
export const CategoryImageUrlSchema = z.url()

export const CategoryCreationSchema = z.object({
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema.optional(),
  imageUrl: CategoryImageUrlSchema.optional()
})

export const CategoryUpdateSchema = z.object({
  name: CategoryNameSchema.optional(),
  description: CategoryDescriptionSchema.optional(),
  imageUrl: CategoryImageUrlSchema.optional()
})

export const CategoryDTOSchema = z.object({
  id: CategoryIdSchema,
  name: CategoryNameSchema,
  description: CategoryDescriptionSchema.nullable(),
  imageUrl: z.url().nullable()
})
