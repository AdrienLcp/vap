'use client'

import {
  ApiClient,
  type ClientResponse,
  unknownError
} from '@/infrastructure/api/api-client'
import type {
  BadRequestResponse,
  NotFoundResponse,
  OkResponse,
  Response,
  UnauthorizedResponse
} from '@/infrastructure/api/http-response'

type CheckoutSessionCreationData = {
  shippingAddressId: string
}

type CheckoutSessionCreationResponse = Response<
  | OkResponse<{ url: string }>
  | BadRequestResponse<unknown>
  | UnauthorizedResponse
  | NotFoundResponse
>

const createCheckoutSession = async (
  data: CheckoutSessionCreationData
): Promise<ClientResponse<CheckoutSessionCreationResponse>> => {
  try {
    return await ApiClient.POST<
      CheckoutSessionCreationResponse,
      CheckoutSessionCreationData
    >('checkout', data)
  } catch (error) {
    console.error('Create checkout session error:', error)
    return unknownError()
  }
}

export const CheckoutClient = {
  createCheckoutSession
}
