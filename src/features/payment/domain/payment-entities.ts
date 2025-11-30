import type { z } from 'zod'

import type {
  CardPaymentMethodSchema,
  CardPaymentMethodTypeSchema,
  NonCardPaymentMethodSchema,
  NonCardPaymentMethodTypeSchema,
  PaymentMethodCreationDTOSchema,
  PaymentMethodCreationSchema,
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodProviderSchema,
  PaymentMethodTypeSchema,
  PaymentMethodUpdateDTOSchema,
  PaymentMethodUpdateSchema
} from '@/features/payment/domain/payment-schemas'
import type { ValueOf } from '@/helpers/object'
import type { Issues, ValidationErrors } from '@/helpers/validation'
import type {
  BadRequestResponse,
  CreatedResponse,
  NoContentResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'

export type PaymentMethodId = z.infer<typeof PaymentMethodIdSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethod = {
  expiryMonth: number | null
  expiryYear: number | null
  id: PaymentMethodId
  isDefault: boolean
  last4: string | null
  provider: PaymentMethodProvider
  type: PaymentMethodType
}

export type PaymentMethodCreationData = z.infer<typeof PaymentMethodCreationSchema>

export type PaymentMethodCreationDTO = z.infer<typeof PaymentMethodCreationDTOSchema>

export type PaymentMethodUpdateData = z.infer<typeof PaymentMethodUpdateSchema>

export type PaymentMethodUpdateDTO = z.infer<typeof PaymentMethodUpdateDTOSchema>

export type CardPaymentMethod = z.infer<typeof CardPaymentMethodSchema>

export type CardPaymentMethodType = z.infer<typeof CardPaymentMethodTypeSchema>

export type NonCardPaymentMethod = z.infer<typeof NonCardPaymentMethodSchema>

export type NonCardPaymentMethodType = z.infer<typeof NonCardPaymentMethodTypeSchema>

export type PaymentMethodType = z.infer<typeof PaymentMethodTypeSchema>

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

export type PaymentMethodDefaultResponse = Response<
  | OkResponse<PaymentMethodDTO[]>
  | BadRequestResponse<Issues<PaymentMethodId>>
  | UnauthorizedResponse
  | NotFoundResponse
>

export type PaymentMethodFormErrors = ValidationErrors<ValueOf<typeof ADDRESS_FORM_FIELDS>>
