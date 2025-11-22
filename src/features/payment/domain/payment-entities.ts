import type { z } from 'zod'

import type {
  PaymentMethodCreationDTOSchema,
  PaymentMethodCreationSchema,
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodProviderSchema,
  PaymentMethodUpdateDTOSchema,
  PaymentMethodUpdateSchema
} from '@/features/payment/domain/payment-schemas'
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

export type PaymentMethodId = z.infer<typeof PaymentMethodIdSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethodCreationData = z.infer<typeof PaymentMethodCreationSchema>

export type PaymentMethodCreationDTO = z.infer<typeof PaymentMethodCreationDTOSchema>

export type PaymentMethodUpdateData = z.infer<typeof PaymentMethodUpdateSchema>

export type PaymentMethodUpdateDTO = z.infer<typeof PaymentMethodUpdateDTOSchema>

export type PaymentMethodCreationResponse = Response<
  | CreatedResponse<PaymentMethodDTO>
  | BadRequestResponse<Issues<PaymentMethodCreationDTO>>
  | UnauthorizedResponse
>

export type PaymentMethodResponse = Response<
  | OkResponse<PaymentMethodDTO>
  | BadRequestResponse<Issues<PaymentMethodId>>
  | UnauthorizedResponse
  | NotFoundResponse
>

export type PaymentMethodsResponse = Response<OkResponse<PaymentMethodDTO[]> | UnauthorizedResponse>

export type PaymentMethodDeletionResponse = Response<
  | NoContentResponse
  | BadRequestResponse<Issues<PaymentMethodId>>
  | UnauthorizedResponse
  | NotFoundResponse
>

export type PaymentMethodUpdateResponse = Response<
  | OkResponse<PaymentMethodDTO>
  | BadRequestResponse<Issues<PaymentMethodUpdateDTO>>
  | UnauthorizedResponse
  | NotFoundResponse
>
