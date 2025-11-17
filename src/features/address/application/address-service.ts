import 'server-only'

import type {
  AddressCreationData,
  AddressId,
  AddressUpdateData
} from '@/features/address/domain/address-entities'
import { AddressRepository } from '@/features/address/infrastructure/address-repository'
import { AuthService } from '@/features/auth/application/auth-service'

const createUserAddress = async (addressCreationData: AddressCreationData) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await AddressRepository.createUserAddress(userResult.data.id, addressCreationData)
}

const deleteUserAddress = async (addressId: AddressId) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await AddressRepository.deleteUserAddress(userResult.data.id, addressId)
}

const deleteUserAddresses = async () => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await AddressRepository.deleteUserAddresses(userResult.data.id)
}

const findUserAddress = async (addressId: AddressId) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await AddressRepository.findUserAddress(userResult.data.id, addressId)
}

const findUserAddresses = async () => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  return await AddressRepository.findUserAddresses(userResult.data.id)
}

const updateUserAddress = async (addressId: AddressId, addressUpdateData: AddressUpdateData) => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const userId = userResult.data.id

  if (addressUpdateData.isDefault) {
    const addressesUpdateResult = await AddressRepository.clearUserDefaultAddresses(userId)

    if (addressesUpdateResult.status === 'ERROR') {
      return addressesUpdateResult
    }
  }

  return await AddressRepository.updateUserAddress(userId, addressId, addressUpdateData)
}

export const AddressService = {
  createUserAddress,
  deleteUserAddress,
  deleteUserAddresses,
  findUserAddress,
  findUserAddresses,
  updateUserAddress
}
