import type z from 'zod'

import type { ApiResponse, Forbidden, ResponseWithValidation, Unauthorized } from '@/infrastructure/api/api-domain'
import type { ProductCreationSchema, ProductDTOSchema, ProductPublicDTOSchema, ProductStatusSchema, ProductUpdateSchema } from '@/product/domain/product-schemas'

export type ProductStatus = z.infer<typeof ProductStatusSchema>

export type ProductCreationData = z.infer<typeof ProductCreationSchema>

export type ProductUpdateData = z.infer<typeof ProductUpdateSchema>

export type ProductDTO = z.infer<typeof ProductDTOSchema>

export type ProductPublicDTO = z.infer<typeof ProductPublicDTOSchema>

export type ProductError = Forbidden | Unauthorized

export type ProductListResponse = ApiResponse<ProductError, ProductDTO[]>

export type ProductPublicListResponse = ApiResponse<ProductError, ProductPublicDTO[]>
export type ProductCreationResponse = ResponseWithValidation<ProductError, ProductCreationData, ProductDTO>
export type ProductUpdateResponse = ResponseWithValidation<ProductError, ProductUpdateData, ProductDTO>
export type ProductDeleteResponse = ResponseWithValidation<ProductError>
