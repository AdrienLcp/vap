import type z from 'zod'

import type { Forbidden, Unauthorized } from '@/helpers/result'
import type { BadRequestResponse, CreatedResponse, ForbiddenResponse, NoContentResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { ProductCreationSchema, ProductDTOSchema, ProductPublicDTOSchema, ProductStatusSchema, ProductUpdateSchema } from '@/product/domain/product-schemas'
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

export type ProductPublicListResponse = Response<OkResponse<ProductDTO[]>>

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
