import type z from 'zod'

import type { CartItemCreationDataSchema, CartItemDTOSchema, CartItemProduct, CartItemSchema, CartItemUpdateDataSchema } from '@/features/cart/domain/cart-schemas'
import type { BadRequestResponse, CreatedResponse, ForbiddenResponse, OkResponse, Response, UnauthorizedResponse } from '@/infrastructure/api/http-response'
import type { Issues } from '@/utils/validation-utils'

export type CartItem = z.infer<typeof CartItemSchema>

export type CartProduct = z.infer<typeof CartItemProduct>

export type CartItemDTO = z.infer<typeof CartItemDTOSchema>

export type CartItemCreationData = z.infer<typeof CartItemCreationDataSchema>

export type CartItemUpdateData = z.infer<typeof CartItemUpdateDataSchema>

export type CartItemListResponse = Response<
  | OkResponse<CartItemDTO[]>
  | UnauthorizedResponse
>

export type CartItemCreationResponse = Response<
  | CreatedResponse<CartItemDTO>
  | BadRequestResponse<Issues<CartItemCreationData>>
  | UnauthorizedResponse
>

export type CartItemQuantityUpdateResponse = Response<
  | OkResponse<CartItemDTO>
  | BadRequestResponse<Issues<CartItemUpdateData>>
  | UnauthorizedResponse
  | ForbiddenResponse
>
