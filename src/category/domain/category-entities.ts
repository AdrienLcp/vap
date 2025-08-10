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

export type CategoryListResponse = ApiResponse<null, CategoryDTO[]>
export type CategoryCreationResponse = ResponseWithValidation<CategoryCreationError, CategoryCreationData, CategoryDTO>
export type CategoryUpdateResponse = ResponseWithValidation<CategoryUpdateError, CategoryUpdateData, CategoryDTO>
