import 'server-only'

import type { NotFound } from '@/domain/entities'
import type {
  AddressCreationData,
  AddressDTO,
  AddressId,
  AddressUpdateData
} from '@/features/address/domain/address-entities'
import type { UserId } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { AddressDatabase, type EntitySelectedFields } from '@/infrastructure/database'

const ADDRESS_SELECTED_FIELDS = {
  city: true,
  country: true,
  id: true,
  isDefault: true,
  postalCode: true,
  street: true
} satisfies EntitySelectedFields<AddressDTO>

const clearUserDefaultAddresses = async (userId: UserId): Promise<Result> => {
  try {
    await AddressDatabase.updateMany({
      data: {
        isDefault: false
      },
      where: {
        isDefault: true,
        userId
      }
    })

    return success()
  } catch (error) {
    console.error('Unknown error in AddressRepository.clearUserDefaultAddresses:', error)
    return failure()
  }
}

const createUserAddress = async (
  userId: UserId,
  addressCreationData: AddressCreationData
): Promise<Result<AddressDTO>> => {
  try {
    const createdAddress = await AddressDatabase.create({
      data: {
        city: addressCreationData.city,
        country: addressCreationData.country,
        isDefault: addressCreationData.isDefault,
        postalCode: addressCreationData.postalCode,
        street: addressCreationData.street,
        userId
      },
      select: ADDRESS_SELECTED_FIELDS
    })

    return success(createdAddress)
  } catch (error) {
    console.error('Unknown error in AddressRepository.createUserAddress:', error)
    return failure()
  }
}

const deleteUserAddress = async (
  userId: UserId,
  addressId: AddressId
): Promise<Result<null, NotFound>> => {
  try {
    const deletedAddress = await AddressDatabase.delete({
      where: {
        id: addressId,
        userId
      }
    })

    if (!deletedAddress) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
    console.error('Unknown error in AddressRepository.deleteUserAddress:', error)
    return failure()
  }
}

const deleteUserAddresses = async (userId: UserId): Promise<Result> => {
  try {
    await AddressDatabase.deleteMany({ where: { userId } })

    return success()
  } catch (error) {
    console.error('Unknown error in AddressRepository.deleteUserAddresses:', error)
    return failure()
  }
}

const findUserAddress = async (
  userId: UserId,
  addressId: AddressId
): Promise<Result<AddressDTO, NotFound>> => {
  try {
    const userAddress = await AddressDatabase.findUnique({
      select: ADDRESS_SELECTED_FIELDS,
      where: { id: addressId, userId }
    })

    if (!userAddress) {
      return failure('NOT_FOUND')
    }

    return success(userAddress)
  } catch (error) {
    console.error('Unknown error in AddressRepository.findUserAddresses:', error)
    return failure()
  }
}

const findUserAddresses = async (userId: UserId): Promise<Result<AddressDTO[]>> => {
  try {
    const userAddresses = await AddressDatabase.findMany({
      select: ADDRESS_SELECTED_FIELDS,
      where: { userId }
    })

    return success(userAddresses)
  } catch (error) {
    console.error('Unknown error in AddressRepository.findUserAddresses:', error)
    return failure()
  }
}

const updateUserAddress = async (
  userId: UserId,
  addressId: AddressId,
  addressData: AddressUpdateData
): Promise<Result<AddressDTO, NotFound>> => {
  try {
    const updatedAddress = await AddressDatabase.update({
      data: {
        city: addressData.city,
        country: addressData.country,
        isDefault: addressData.isDefault,
        postalCode: addressData.postalCode,
        street: addressData.street
      },
      select: ADDRESS_SELECTED_FIELDS,
      where: {
        id: addressId,
        userId
      }
    })

    if (!updatedAddress) {
      return failure('NOT_FOUND')
    }

    return success(updatedAddress)
  } catch (error) {
    console.error('Unknown error in AddressRepository.updateUserAddress:', error)
    return failure()
  }
}

export const AddressRepository = {
  clearUserDefaultAddresses,
  createUserAddress,
  deleteUserAddress,
  deleteUserAddresses,
  findUserAddress,
  findUserAddresses,
  updateUserAddress
}
