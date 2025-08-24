import type z from 'zod'

import type { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import type { CategoryCreationSchema, CategoryDTOSchema, CategoryUpdateSchema } from '@/category/domain/category-schemas'
import type { ValidationErrors } from '@/domain/entities'
import type { Forbidden, Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, ConflictResponse, CreatedResponse, ForbiddenResponse, NoContentResponse, NotFoundResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues } from '@/utils/validation-utils'

export type CategoryCreationData = z.infer<typeof CategoryCreationSchema>

export type CategoryUpdateData = z.infer<typeof CategoryUpdateSchema>

export type CategoryDTO = z.infer<typeof CategoryDTOSchema>

export type CategoryNameAlreadyExists = typeof CATEGORY_CONSTANTS.NAME_ALREADY_EXISTS
export type CategoryConflictError = CategoryNameAlreadyExists

export type CategoryCreationError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryUpdateError =
  | CategoryNameAlreadyExists
  | Forbidden
  | Unauthorized

export type CategoryListResponse = Response<OkResponse<CategoryDTO[]>>

export type CategoryResponse = Response<
  | OkResponse<CategoryDTO>
  | BadRequestResponse<Issues<string>>
  | NotFoundResponse
>

export type CategoryCreationResponse = Response<
  | CreatedResponse<CategoryDTO>
  | BadRequestResponse<Issues<CategoryCreationData>>
  | ConflictResponse<CategoryConflictError>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type CategoryDeletionResponse = Response<
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type CategoryUpdateResponse = Response<
  | OkResponse<CategoryDTO>
  | BadRequestResponse<Issues<CategoryUpdateData | string>>
  | ConflictResponse<CategoryNameAlreadyExists>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type CategoryValidationErrors = ValidationErrors<ValueOf<typeof CATEGORY_FORM_FIELDS>>
