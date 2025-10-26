import type z from 'zod'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import type { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type {
  ProductCategoryDTOSchema,
  ProductCreationSchema,
  ProductDTOSchema,
  ProductPublicDTOSchema,
  ProductSchema,
  ProductStatusSchema,
  ProductUpdateSchema
} from '@/features/product/domain/product-schemas'
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

export type ProductStatus = z.infer<typeof ProductStatusSchema>

export type ProductCreationData = z.infer<typeof ProductCreationSchema>

export type ProductUpdateData = z.infer<typeof ProductUpdateSchema>

export type Product = z.infer<typeof ProductSchema>

export type ProductDTO = z.infer<typeof ProductDTOSchema>

export type ProductCategoryDTO = z.infer<typeof ProductCategoryDTOSchema>

export type ProductPublicDTO = z.infer<typeof ProductPublicDTOSchema>

export type ProductSKUAlreadyExists = 'PRODUCT_SKU_ALREADY_EXISTS'

export type ProductConflictError = ProductSKUAlreadyExists

export type ProductError = Forbidden | Unauthorized

export type ProductEditError = ProductError | ProductConflictError

type ProductListResult = OkResponse<ProductDTO[]> | UnauthorizedResponse | ForbiddenResponse

export type ProductListResponse = Response<ProductListResult>

type ProductResult =
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse

export type ProductResponse = Response<ProductResult>

export type ProductPublicListResponse = Response<OkResponse<ProductPublicDTO[]>>

type ProductPublicResult =
  | OkResponse<ProductPublicDTO>
  | BadRequestResponse<Issues<string>>
  | NotFoundResponse

export type ProductPublicResponse = Response<ProductPublicResult>

type ProductCreationResult =
  | CreatedResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductCreationData>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse<ProductConflictError>

export type ProductCreationResponse = Response<ProductCreationResult>

type ProductUpdateResult =
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductUpdateData | string>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse<ProductConflictError>

export type ProductUpdateResponse = Response<ProductUpdateResult>

type ProductDeletionResult =
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type ProductDeletionResponse = Response<ProductDeletionResult>

export type ProductValidationErrors = ValidationErrors<ValueOf<typeof PRODUCT_FORM_FIELDS>>
