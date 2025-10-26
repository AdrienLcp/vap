import type z from 'zod'

import type {
  CartItemCreationDataSchema,
  CartItemDTOSchema,
  CartItemProduct,
  CartItemSchema,
  CartItemUpdateDataSchema
} from '@/features/cart/domain/cart-schemas'
import type {
  BadRequestResponse,
  CreatedResponse,
  ForbiddenResponse,
  NoContentResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import type { Issues } from '@/utils/validation-utils'

export type CartItem = z.infer<typeof CartItemSchema>

export type CartProduct = z.infer<typeof CartItemProduct>

export type CartItemDTO = z.infer<typeof CartItemDTOSchema>

export type CartItemCreationData = z.infer<typeof CartItemCreationDataSchema>

export type CartItemUpdateData = z.infer<typeof CartItemUpdateDataSchema>

type CartItemListResult = OkResponse<CartItemDTO[]> | UnauthorizedResponse

export type CartItemListResponse = Response<CartItemListResult>

type CartItemCreationResult =
  | CreatedResponse<CartItemDTO>
  | BadRequestResponse<Issues<CartItemCreationData>>
  | UnauthorizedResponse

export type CartItemCreationResponse = Response<CartItemCreationResult>

type CartItemUpdateResult =
  | OkResponse<CartItemDTO>
  | BadRequestResponse<Issues<CartItemUpdateData>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CartItemUpdateResponse = Response<CartItemUpdateResult>

type CartItemDeletionResult =
  | NoContentResponse
  | BadRequestResponse<Issues<string>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CartItemDeletionResponse = Response<CartItemDeletionResult>

type CartItemQuantityUpdateResult =
  | NoContentResponse
  | BadRequestResponse<Issues<CartItemUpdateData>>
  | UnauthorizedResponse
  | ForbiddenResponse

export type CartItemQuantityUpdateResponse = Response<CartItemQuantityUpdateResult>

type CartClearResult = NoContentResponse | UnauthorizedResponse

export type CartClearResponse = Response<CartClearResult>
