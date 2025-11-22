'use client'

import { ADDRESS_API_BASE_URL } from '@/features/address/domain/address-constants'
import type {
  AddressCreationData,
  AddressCreationResponse,
  AddressDeletionResponse,
  AddressListResponse,
  AddressResponse
} from '@/features/address/domain/address-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const createUserAddress = async (
  addressCreationData: AddressCreationData
): Promise<ClientResponse<AddressCreationResponse>> => {
  try {
    return await ApiClient.POST<AddressCreationResponse, AddressCreationData>(
      ADDRESS_API_BASE_URL,
      addressCreationData
    )
  } catch (error) {
    console.error('Create address error:', error)
    return unknownError()
  }
}

const deleteUserAddress = async (
  addressId: string
): Promise<ClientResponse<AddressDeletionResponse>> => {
  try {
    const addressDeletionApiUrl = `/${ADDRESS_API_BASE_URL}/${encodeURIComponent(addressId)}`
    return await ApiClient.DELETE<AddressDeletionResponse>(addressDeletionApiUrl)
  } catch (error) {
    console.error('Delete address error:', error)
    return unknownError()
  }
}

const findUserAddress = async (addressId: string): Promise<ClientResponse<AddressResponse>> => {
  try {
    const addressApiUrl = `/${ADDRESS_API_BASE_URL}/${encodeURIComponent(addressId)}`
    return await ApiClient.GET<AddressResponse>(addressApiUrl)
  } catch (error) {
    console.error('Find address error:', error)
    return unknownError()
  }
}

const findUserAddresses = async (): Promise<ClientResponse<AddressListResponse>> => {
  try {
    return await ApiClient.GET<AddressListResponse>(`/${ADDRESS_API_BASE_URL}`)
  } catch (error) {
    console.error('Find addresses error:', error)
    return unknownError()
  }
}

const updateUserAddress = async (
  addressId: string,
  addressUpdateData: AddressCreationData
): Promise<ClientResponse<AddressResponse>> => {
  try {
    const addressApiUrl = `/${ADDRESS_API_BASE_URL}/${encodeURIComponent(addressId)}`
    return await ApiClient.PATCH<AddressResponse, AddressCreationData>(
      addressApiUrl,
      addressUpdateData
    )
  } catch (error) {
    console.error('Update address error:', error)
    return unknownError()
  }
}

export const AddressClient = {
  createUserAddress,
  deleteUserAddress,
  findUserAddress,
  findUserAddresses,
  updateUserAddress
}
