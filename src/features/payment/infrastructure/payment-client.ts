'use client'

import { PAYMENT_API_BASE_URL } from '@/features/payment/domain/payment-constants'
import type {
  PaymentMethodCreationDTO,
  PaymentMethodCreationResponse,
  PaymentMethodDeletionResponse,
  PaymentMethodsResponse,
  PaymentMethodUpdateDTO,
  PaymentMethodUpdateResponse
} from '@/features/payment/domain/payment-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const createUserPaymentMethod = async (
  paymentMethodCreationDTO: PaymentMethodCreationDTO
): Promise<ClientResponse<PaymentMethodCreationResponse>> => {
  try {
    return await ApiClient.POST<PaymentMethodCreationResponse, PaymentMethodCreationDTO>(
      PAYMENT_API_BASE_URL,
      paymentMethodCreationDTO
    )
  } catch (error) {
    console.error('Create payment method error:', error)
    return unknownError()
  }
}

const deleteUserPaymentMethod = async (
  paymentMethodId: string
): Promise<ClientResponse<PaymentMethodDeletionResponse>> => {
  try {
    const paymentMethodDeletionApiUrl = `/${PAYMENT_API_BASE_URL}/${encodeURIComponent(paymentMethodId)}`
    return await ApiClient.DELETE<PaymentMethodDeletionResponse>(paymentMethodDeletionApiUrl)
  } catch (error) {
    console.error('Delete payment method error:', error)
    return unknownError()
  }
}

const findUserPaymentMethod = async (
  paymentMethodId: string
): Promise<ClientResponse<PaymentMethodsResponse>> => {
  try {
    const paymentMethodApiUrl = `/${PAYMENT_API_BASE_URL}/${encodeURIComponent(paymentMethodId)}`
    return await ApiClient.GET<PaymentMethodsResponse>(paymentMethodApiUrl)
  } catch (error) {
    console.error('Find payment method error:', error)
    return unknownError()
  }
}

const findUserPaymentMethods = async (): Promise<ClientResponse<PaymentMethodsResponse>> => {
  try {
    return await ApiClient.GET<PaymentMethodsResponse>(`/${PAYMENT_API_BASE_URL}`)
  } catch (error) {
    console.error('Find payment methods error:', error)
    return unknownError()
  }
}

const updateUserPaymentMethod = async (
  paymentMethodId: string,
  paymentMethodUpdateData: PaymentMethodUpdateDTO
): Promise<ClientResponse<PaymentMethodUpdateResponse>> => {
  try {
    const paymentMethodApiUrl = `/${PAYMENT_API_BASE_URL}/${encodeURIComponent(paymentMethodId)}`
    return await ApiClient.PATCH<PaymentMethodUpdateResponse, PaymentMethodUpdateDTO>(
      paymentMethodApiUrl,
      paymentMethodUpdateData
    )
  } catch (error) {
    console.error('Update payment method error:', error)
    return unknownError()
  }
}

export const PaymentClient = {
  createUserPaymentMethod,
  deleteUserPaymentMethod,
  findUserPaymentMethod,
  findUserPaymentMethods,
  updateUserPaymentMethod
}
