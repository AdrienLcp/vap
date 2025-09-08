import type z from 'zod'

import type { PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import type { ProductCreationSchema, ProductDTOSchema, ProductPublicDTOSchema, ProductStatusSchema, ProductUpdateSchema } from '@/features/product/domain/product-schemas'
import type { Forbidden, Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, ConflictResponse, CreatedResponse, ForbiddenResponse, NoContentResponse, NotFoundResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues, ValidationErrors } from '@/utils/validation-utils'

export type ProductStatus = z.infer<typeof ProductStatusSchema>

export type ProductCreationData = z.infer<typeof ProductCreationSchema>

export type ProductUpdateData = z.infer<typeof ProductUpdateSchema>

export type ProductDTO = z.infer<typeof ProductDTOSchema>

export type ProductPublicDTO = z.infer<typeof ProductPublicDTOSchema>

export type ProductSKUAlreadyExists = 'PRODUCT_SKU_ALREADY_EXISTS'

export type ProductConflictError = ProductSKUAlreadyExists

export type ProductError =
  | Forbidden
  | Unauthorized

export type ProductEditError =
  | ProductError
  | ProductConflictError

export type ProductListResponse = Response<
  | OkResponse<ProductDTO[]>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type ProductResponse = Response<
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | NotFoundResponse
>

export type ProductPublicListResponse = Response<OkResponse<ProductPublicDTO[]>>

export type ProductPublicResponse = Response<
  | OkResponse<ProductPublicDTO>
  | BadRequestResponse<Issues<string>>
  | NotFoundResponse
>

export type ProductCreationResponse = Response<
  | CreatedResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductCreationData>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse<ProductConflictError>
>

export type ProductUpdateResponse = Response<
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductUpdateData | string>>
  | UnauthorizedResponse
  | ForbiddenResponse
  | ConflictResponse<ProductConflictError>
>

export type ProductDeleteResponse = Response<
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type ProductValidationErrors = ValidationErrors<ValueOf<typeof PRODUCT_FORM_FIELDS>>
