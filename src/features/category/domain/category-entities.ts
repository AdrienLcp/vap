import type z from 'zod'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import type {
  CATEGORY_ERRORS,
  CATEGORY_FORM_FIELDS
} from '@/features/category/domain/category-constants'
import type {
  CategoryCreationSchema,
  CategoryDTOSchema,
  CategorySchema,
  CategoryUpdateSchema
} from '@/features/category/domain/category-schemas'
import type {
  BadRequestResponse,
  ConflictResponse,
  CreatedResponse,
  ForbiddenResponse,
  NoContentResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues, ValidationErrors } from '@/utils/validation-utils'

export type Category = z.infer<typeof CategorySchema>

export type CategoryCreationData = z.infer<typeof CategoryCreationSchema>

export type CategoryUpdateData = z.infer<typeof CategoryUpdateSchema>

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>

export type CategoryNameAlreadyExists = typeof CATEGORY_ERRORS.NAME_ALREADY_EXISTS
export type CategoryConflictError = CategoryNameAlreadyExists

export type CategoryEditError = CategoryNameAlreadyExists | Forbidden | Unauthorized

export type CategoryListResponse = Response<OkResponse<CategoryDTO[]>>

type CategoryResult =
  | OkResponse<CategoryDTO>
  | BadRequestResponse<Issues<string>>
  | NotFoundResponse

export type CategoryResponse = Response<CategoryResult>

type CategoryCreationResult =
  | CreatedResponse<CategoryDTO>
  | BadRequestResponse<Issues<CategoryCreationData>>
  | ConflictResponse<CategoryConflictError>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CategoryCreationResponse = Response<CategoryCreationResult>

type CategoryDeletionResult =
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CategoryDeletionResponse = Response<CategoryDeletionResult>

type CategoryUpdateResult =
  | OkResponse<CategoryDTO>
  | BadRequestResponse<Issues<CategoryUpdateData | string>>
  | ConflictResponse<CategoryNameAlreadyExists>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CategoryUpdateResponse = Response<CategoryUpdateResult>

export type CategoryValidationErrors = ValidationErrors<ValueOf<typeof CATEGORY_FORM_FIELDS>>
