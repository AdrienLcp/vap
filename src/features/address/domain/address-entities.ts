import type { z } from 'zod'

import type {
  AddressCreationSchema,
  AddressDTOSchema,
  AddressIdSchema,
  AddressUpdateSchema
} from '@/features/address/domain/address-schemas'
import type {
  BadRequestResponse,
  CreatedResponse,
  NoContentResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'
import type { Issues } from '@/utils/validation-utils'

export type AddressId = z.infer<typeof AddressIdSchema>

export type AddressDTO = z.infer<typeof AddressDTOSchema>

export type AddressCreationData = z.infer<typeof AddressCreationSchema>

export type AddressUpdateData = z.infer<typeof AddressUpdateSchema>

export type AddressResponse = Response<
  | OkResponse<AddressDTO>
  | BadRequestResponse<Issues<AddressId>>
  | UnauthorizedResponse
  | NotFoundResponse
>

export type AddressListResponse = Response<OkResponse<AddressDTO[]> | UnauthorizedResponse>

export type AddressCreationResponse = Response<
  | CreatedResponse<AddressDTO>
  | BadRequestResponse<Issues<AddressCreationData>>
  | UnauthorizedResponse
>

export type AddressUpdateResponse = Response<
  | OkResponse<AddressDTO>
  | BadRequestResponse<Issues<AddressUpdateData | AddressId>>
  | UnauthorizedResponse
  | NotFoundResponse
>

export type AddressDeletionResponse = Response<
  | NoContentResponse
  | BadRequestResponse<Issues<AddressId>>
  | UnauthorizedResponse
  | NotFoundResponse
>
