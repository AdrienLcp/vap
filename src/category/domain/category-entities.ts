import type z from 'zod'

import type { CATEGORY_CONSTANTS } from '@/category/domain/category-constants'
import type { CategoryCreationSchema, CategoryDTOSchema, CategoryUpdateSchema } from '@/category/domain/category-schemas'
import type { Forbidden, Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, ConflictResponse, CreatedResponse, ForbiddenResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'

export type CategoryCreationData = z.infer<typeof CategoryCreationSchema>

export type CategoryUpdateData = z.infer<typeof CategoryUpdateSchema>

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>

export type CategoryNameAlreadyExists = typeof CATEGORY_CONSTANTS.NAME_ALREADY_EXISTS

export type CategoryCreationError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryUpdateError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryListResponse = Response<OkResponse<CategoryDTO[]>>

export type CategoryCreationResponse = Response<
  | CreatedResponse<CategoryDTO>
  | BadRequestResponse<z.ZodError<CategoryCreationData>>
  | ConflictResponse<CategoryNameAlreadyExists>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type CategoryUpdateResponse = Response<
  | OkResponse<CategoryDTO>
  | BadRequestResponse<z.ZodError<CategoryUpdateData | string>>
  | ConflictResponse<CategoryNameAlreadyExists>
  | UnauthorizedResponse
  | ForbiddenResponse
>
