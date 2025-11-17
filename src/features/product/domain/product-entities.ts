import type z from 'zod'

import type { Forbidden, Unauthorized } from '@/domain/entities'
import type { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type {
  ProductCategoryDTOSchema,
  ProductCreationSchema,
  ProductDTOSchema,
  ProductFiltersSchema,
  ProductIdSchema,
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

export type ProductId = z.infer<typeof ProductIdSchema>

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

export type ProductFilters = z.infer<typeof ProductFiltersSchema>

type ProductListResult = OkResponse<ProductDTO[]> | UnauthorizedResponse | ForbiddenResponse

export type ProductListResponse = Response<ProductListResult>

type ProductResult =
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductId>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse

export type ProductResponse = Response<ProductResult>

export type ProductPublicListResponse = Response<OkResponse<ProductPublicDTO[]>>

type ProductPublicResult =
  | OkResponse<ProductPublicDTO>
  | BadRequestResponse<Issues<ProductId | ProductFilters>>
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
  | BadRequestResponse<Issues<ProductUpdateData | ProductId>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse<ProductConflictError>

export type ProductUpdateResponse = Response<ProductUpdateResult>

type ProductDeletionResult =
  | NoContentResponse
  | BadRequestResponse<Issues<ProductId>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type ProductDeletionResponse = Response<ProductDeletionResult>

export type ProductValidationErrors = ValidationErrors<ValueOf<typeof PRODUCT_FORM_FIELDS>>

export type ProductPriceFilters = {
  maxPrice?: number
  minPrice?: number
}
