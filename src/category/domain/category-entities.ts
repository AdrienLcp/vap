import type z from 'zod'

import type { CategoryCreationSchema, CategoryDTOSchema, CategoryUpdateSchema } from '@/category/domain/category-schemas'
import type { ApiResponse, Forbidden, ResponseWithValidation, Unauthorized } from '@/infrastructure/api/api-domain'

export type CategoryCreationData = z.infer<typeof CategoryCreationSchema>

export type CategoryUpdateData = z.infer<typeof CategoryUpdateSchema>

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>

export type CategoryNameAlreadyExists = 'CATEGORY_NAME_ALREADY_EXISTS'

export type CategoryCreationError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryUpdateError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryListResponse = ApiResponse<undefined, CategoryDTO[]>
export type CategoryCreationResponse = ResponseWithValidation<CategoryCreationError, null, CategoryCreationData, CategoryDTO>

type CategoryUpdateParams = { categoryId: string }
export type CategoryUpdateResponse = ResponseWithValidation<CategoryUpdateError, CategoryUpdateParams, CategoryCreationData, CategoryDTO>
