import type { z } from 'zod'

import type {
  PaymentMethodCreationDTOSchema,
  PaymentMethodCreationSchema,
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodProviderSchema
} from '@/features/payment/domain/payment-schemas'
import type {
  CreatedResponse,
  NoContentResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'

export type PaymentMethodId = z.infer<typeof PaymentMethodIdSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethodCreationData = z.infer<typeof PaymentMethodCreationSchema>

export type PaymentMethodCreationDTO = z.infer<typeof PaymentMethodCreationDTOSchema>

export type PaymentMethodCreationResponse = Response<
  CreatedResponse<PaymentMethodDTO> | UnauthorizedResponse
>

export type PaymentMethodsResponse = Response<
  | OkResponse<PaymentMethodDTO[]>
  | UnauthorizedResponse
>

export type PaymentMethodDeletionResponse = Response<NoContentResponse | UnauthorizedResponse>

export type PaymentMethodUpdateResponse = Response<
  OkResponse<PaymentMethodDTO> | UnauthorizedResponse
>
