import 'server-only'

import { PaymentService } from '@/features/payment/application/payment-service'
import { PAYMENT_API_BASE_URL } from '@/features/payment/domain/payment-constants'
import type {
  PaymentMethodCreationResponse,
  PaymentMethodDeletionResponse,
  PaymentMethodResponse,
  PaymentMethodsResponse,
  PaymentMethodUpdateResponse
} from '@/features/payment/domain/payment-entities'
import {
  PaymentMethodCreationDTOSchema,
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodUpdateDTOSchema
} from '@/features/payment/domain/payment-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'
import { buildLocationUrl } from '@/utils/url-utils'

const createUserPaymentMethod = async (
  request: Request
): Promise<PaymentMethodCreationResponse> => {
  try {
    const paymentMethodCreationDto = await request.json()
    const paymentMethodCreationDtoValidation =
      PaymentMethodCreationDTOSchema.safeParse(paymentMethodCreationDto)

    if (!paymentMethodCreationDtoValidation.success) {
      return HttpResponse.badRequest(paymentMethodCreationDtoValidation.error.issues)
    }

    const paymentMethodCreationResult =
      await PaymentService.createUserPaymentMethod(paymentMethodCreationDto)

    if (paymentMethodCreationResult.status === 'ERROR') {
      switch (paymentMethodCreationResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in PaymentController.createUserPaymentMethod:',
            paymentMethodCreationResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const createdPaymentMethodValidation = PaymentMethodDTOSchema.safeParse(
      paymentMethodCreationResult.data
    )

    if (!createdPaymentMethodValidation.success) {
      return HttpResponse.internalServerError()
    }

    const createdPaymentMethodDTO = createdPaymentMethodValidation.data
    const createdAddressLocationUrl = buildLocationUrl(
      PAYMENT_API_BASE_URL,
      createdPaymentMethodDTO.id
    )

    return HttpResponse.created(createdPaymentMethodDTO, { Location: createdAddressLocationUrl })
  } catch (error) {
    console.error('Error in PaymentController.createUserPaymentMethod:', error)
    return HttpResponse.internalServerError()
  }
}

const deleteUserPaymentMethod = async (
  paymentMethodId: string
): Promise<PaymentMethodDeletionResponse> => {
  try {
    const paymentMethodIdValidation = PaymentMethodIdSchema.safeParse(paymentMethodId)

    if (!paymentMethodIdValidation.success) {
      return HttpResponse.badRequest(paymentMethodIdValidation.error.issues)
    }

    const paymentMethodDeletionResult = await PaymentService.deleteUserPaymentMethod(
      paymentMethodIdValidation.data
    )

    if (paymentMethodDeletionResult.status === 'ERROR') {
      switch (paymentMethodDeletionResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in PaymentController.deleteUserPaymentMethod:',
            paymentMethodDeletionResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Error in PaymentController.deleteUserPaymentMethod:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserPaymentMethod = async (paymentMethodId: string): Promise<PaymentMethodResponse> => {
  try {
    const paymentMethodIdValidation = PaymentMethodIdSchema.safeParse(paymentMethodId)

    if (!paymentMethodIdValidation.success) {
      return HttpResponse.badRequest(paymentMethodIdValidation.error.issues)
    }

    const paymentMethodResult = await PaymentService.findUserPaymentMethod(
      paymentMethodIdValidation.data
    )

    if (paymentMethodResult.status === 'ERROR') {
      switch (paymentMethodResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in PaymentController.findUserPaymentMethod:',
            paymentMethodResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const paymentMethodValidation = PaymentMethodDTOSchema.safeParse(paymentMethodResult.data)

    if (!paymentMethodValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(paymentMethodValidation.data)
  } catch (error) {
    console.error('Error in PaymentController.findUserPaymentMethod:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
  try {
    const paymentMethodsResult = await PaymentService.findUserPaymentMethods()

    if (paymentMethodsResult.status === 'ERROR') {
      switch (paymentMethodsResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in PaymentController.findUserPaymentMethods:',
            paymentMethodsResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const paymentMethodsValidation = PaymentMethodDTOSchema.array().safeParse(
      paymentMethodsResult.data
    )

    if (!paymentMethodsValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(paymentMethodsValidation.data)
  } catch (error) {
    console.error('Error in PaymentController.findUserPaymentMethods:', error)
    return HttpResponse.internalServerError()
  }
}

const updateUserPaymentMethod = async (
  paymentMethodId: string,
  request: Request
): Promise<PaymentMethodUpdateResponse> => {
  try {
    const paymentMethodIdValidation = PaymentMethodIdSchema.safeParse(paymentMethodId)

    if (!paymentMethodIdValidation.success) {
      return HttpResponse.badRequest(paymentMethodIdValidation.error.issues)
    }

    const paymentMethodUpdateDto = await request.json()
    const paymentMethodUpdateDtoValidation =
      PaymentMethodUpdateDTOSchema.safeParse(paymentMethodUpdateDto)

    if (!paymentMethodUpdateDtoValidation.success) {
      return HttpResponse.badRequest(paymentMethodUpdateDtoValidation.error.issues)
    }

    const paymentMethodUpdateResult = await PaymentService.updateUserPaymentMethod(
      paymentMethodIdValidation.data,
      paymentMethodUpdateDtoValidation.data
    )

    if (paymentMethodUpdateResult.status === 'ERROR') {
      switch (paymentMethodUpdateResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in PaymentController.updateUserPaymentMethod:',
            paymentMethodUpdateResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const updatedPaymentMethodValidation = PaymentMethodDTOSchema.safeParse(
      paymentMethodUpdateResult.data
    )

    if (!updatedPaymentMethodValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(updatedPaymentMethodValidation.data)
  } catch (error) {
    console.error('Error in PaymentController.updateUserPaymentMethod:', error)
    return HttpResponse.internalServerError()
  }
}

export const PaymentController = {
  createUserPaymentMethod,
  deleteUserPaymentMethod,
  findUserPaymentMethod,
  findUserPaymentMethods,
  updateUserPaymentMethod
}
