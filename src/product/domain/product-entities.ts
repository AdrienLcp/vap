import type z from 'zod'

import type { ValidationErrors } from '@/domain/entities'
import type { Forbidden, Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, CreatedResponse, ForbiddenResponse, NoContentResponse, NotFoundResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { PRODUCT_FORM_FIELDS } from '@/product/domain/product-constants'
import type { ProductCreationSchema, ProductDTOSchema, ProductPublicDTOSchema, ProductStatusSchema, ProductUpdateSchema } from '@/product/domain/product-schemas'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues } from '@/utils/validation-utils'

export type ProductStatus = z.infer<typeof ProductStatusSchema>

export type ProductCreationData = z.infer<typeof ProductCreationSchema>

export type ProductUpdateData = z.infer<typeof ProductUpdateSchema>

export type ProductDTO = z.infer<typeof ProductDTOSchema>

export type ProductPublicDTO = z.infer<typeof ProductPublicDTOSchema>

export type ProductError = Forbidden | Unauthorized

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
>

export type ProductUpdateResponse = Response<
  | OkResponse<ProductDTO>
  | BadRequestResponse<Issues<ProductUpdateData | string>>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type ProductDeleteResponse = Response<
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse
>

export type ProductValidationErrors = ValidationErrors<ValueOf<typeof PRODUCT_FORM_FIELDS>>
