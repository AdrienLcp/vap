import 'server-only'

import { AddressService } from '@/features/address/application/address-service'
import { ADDRESS_API_BASE_URL } from '@/features/address/domain/address-constants'
import type {
  AddressCreationResponse,
  AddressDeletionResponse,
  AddressListResponse,
  AddressResponse,
  AddressUpdateResponse
} from '@/features/address/domain/address-entities'
import {
  AddressCreationSchema,
  AddressDTOSchema,
  AddressIdSchema
} from '@/features/address/domain/address-schemas'
import { HttpResponse } from '@/infrastructure/api/http-response'
import { buildLocationUrl } from '@/utils/url-utils'

const createUserAddress = async (request: Request): Promise<AddressCreationResponse> => {
  try {
    const addressCreationData = await request.json()
    const addressCreationValidation = AddressCreationSchema.safeParse(addressCreationData)

    if (!addressCreationValidation.success) {
      return HttpResponse.badRequest(addressCreationValidation.error.issues)
    }

    const addressCreationResult = await AddressService.createUserAddress(
      addressCreationValidation.data
    )

    if (addressCreationResult.status === 'ERROR') {
      switch (addressCreationResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in AddressController.createUserAddress:',
            addressCreationResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const createdAddressValidation = AddressDTOSchema.safeParse(addressCreationResult.data)

    if (!createdAddressValidation.success) {
      return HttpResponse.internalServerError()
    }

    const createdAddressDTO = createdAddressValidation.data
    const createdAddressLocationUrl = buildLocationUrl(ADDRESS_API_BASE_URL, createdAddressDTO.id)

    return HttpResponse.created(createdAddressDTO, { Location: createdAddressLocationUrl })
  } catch (error) {
    console.error('Error in AddressController.createUserAddress:', error)
    return HttpResponse.internalServerError()
  }
}

const deleteUserAddress = async (addressId: string): Promise<AddressDeletionResponse> => {
  try {
    const addressIdValidation = AddressIdSchema.safeParse(addressId)

    if (!addressIdValidation.success) {
      return HttpResponse.badRequest(addressIdValidation.error.issues)
    }

    const addressDeletionResult = await AddressService.deleteUserAddress(addressId)

    if (addressDeletionResult.status === 'ERROR') {
      switch (addressDeletionResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in AddressController.deleteUserAddress:',
            addressDeletionResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    return HttpResponse.noContent()
  } catch (error) {
    console.error('Error in AddressController.deleteUserAddress:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserAddress = async (addressId: string): Promise<AddressResponse> => {
  try {
    const addressIdValidation = AddressIdSchema.safeParse(addressId)

    if (!addressIdValidation.success) {
      return HttpResponse.badRequest(addressIdValidation.error.issues)
    }

    const addressResult = await AddressService.findUserAddress(addressId)

    if (addressResult.status === 'ERROR') {
      switch (addressResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error('Unknown error in AddressController.findUserAddress:', addressResult.error)
          return HttpResponse.internalServerError()
      }
    }

    const addressValidation = AddressDTOSchema.safeParse(addressResult.data)

    if (!addressValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(addressValidation.data)
  } catch (error) {
    console.error('Error in AddressController.findUserAddress:', error)
    return HttpResponse.internalServerError()
  }
}

const findUserAddresses = async (): Promise<AddressListResponse> => {
  try {
    const addressesResult = await AddressService.findUserAddresses()

    if (addressesResult.status === 'ERROR') {
      switch (addressesResult.error) {
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in AddressController.findUserAddresses:',
            addressesResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const addressesValidation = AddressDTOSchema.array().safeParse(addressesResult.data)

    if (!addressesValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(addressesValidation.data)
  } catch (error) {
    console.error('Error in AddressController.findUserAddresses:', error)
    return HttpResponse.internalServerError()
  }
}

const updateUserAddress = async (
  addressId: string,
  request: Request
): Promise<AddressUpdateResponse> => {
  try {
    const addressIdValidation = AddressIdSchema.safeParse(addressId)

    if (!addressIdValidation.success) {
      return HttpResponse.badRequest(addressIdValidation.error.issues)
    }

    const addressUpdateData = await request.json()
    const addressUpdateValidation = AddressDTOSchema.safeParse(addressUpdateData)

    if (!addressUpdateValidation.success) {
      return HttpResponse.badRequest(addressUpdateValidation.error.issues)
    }

    const addressUpdateResult = await AddressService.updateUserAddress(
      addressId,
      addressUpdateValidation.data
    )

    if (addressUpdateResult.status === 'ERROR') {
      switch (addressUpdateResult.error) {
        case 'NOT_FOUND':
          return HttpResponse.notFound()
        case 'UNAUTHORIZED':
          return HttpResponse.unauthorized()
        default:
          console.error(
            'Unknown error in AddressController.updateUserAddress:',
            addressUpdateResult.error
          )
          return HttpResponse.internalServerError()
      }
    }

    const updatedAddressValidation = AddressDTOSchema.safeParse(addressUpdateResult.data)

    if (!updatedAddressValidation.success) {
      return HttpResponse.internalServerError()
    }

    return HttpResponse.ok(updatedAddressValidation.data)
  } catch (error) {
    console.error('Error in AddressController.updateUserAddress:', error)
    return HttpResponse.internalServerError()
  }
}

export const AddressController = {
  createUserAddress,
  deleteUserAddress,
  findUserAddress,
  findUserAddresses,
  updateUserAddress
}
