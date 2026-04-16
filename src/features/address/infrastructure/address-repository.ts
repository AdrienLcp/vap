import 'server-only'

import { and, desc, eq } from 'drizzle-orm'

import type { NotFound } from '@/domain/entities'
import type {
  AddressCreationData,
  AddressDTO,
  AddressId,
  AddressUpdateData
} from '@/features/address/domain/address-entities'
import { addresses } from '@/features/address/infrastructure/address-schema'
import type { UserId } from '@/features/user/domain/user-entities'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'

const addressSelectedFields = {
  city: addresses.city,
  country: addresses.country,
  id: addresses.id,
  isDefault: addresses.isDefault,
  name: addresses.name,
  postalCode: addresses.postalCode,
  street: addresses.street
} as const

const clearUserDefaultAddresses = async (userId: UserId): Promise<Result> => {
  try {
    await db
      .update(addresses)
      .set({ isDefault: false })
      .where(and(eq(addresses.userId, userId), eq(addresses.isDefault, true)))

    return success()
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.clearUserDefaultAddresses:',
      error
    )
    return failure()
  }
}

const createUserAddress = async (
  userId: UserId,
  addressCreationData: AddressCreationData
): Promise<Result<AddressDTO>> => {
  try {
    const [createdAddress] = await db
      .insert(addresses)
      .values({
        city: addressCreationData.city,
        country: addressCreationData.country,
        isDefault: addressCreationData.isDefault,
        name: addressCreationData.name,
        postalCode: addressCreationData.postalCode,
        street: addressCreationData.street,
        userId
      })
      .returning(addressSelectedFields)

    if (!createdAddress) {
      return failure()
    }

    return success(createdAddress)
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.createUserAddress:',
      error
    )
    return failure()
  }
}

const deleteUserAddress = async (
  userId: UserId,
  addressId: AddressId
): Promise<Result<null, NotFound>> => {
  try {
    const deleted = await db
      .delete(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
      .returning({ id: addresses.id })

    if (deleted.length === 0) {
      return failure('NOT_FOUND')
    }

    return success()
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.deleteUserAddress:',
      error
    )
    return failure()
  }
}

const deleteUserAddresses = async (userId: UserId): Promise<Result> => {
  try {
    await db.delete(addresses).where(eq(addresses.userId, userId))

    return success()
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.deleteUserAddresses:',
      error
    )
    return failure()
  }
}

const findUserAddress = async (
  userId: UserId,
  addressId: AddressId
): Promise<Result<AddressDTO, NotFound>> => {
  try {
    const [userAddress] = await db
      .select(addressSelectedFields)
      .from(addresses)
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
      .limit(1)

    if (!userAddress) {
      return failure('NOT_FOUND')
    }

    return success(userAddress)
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.findUserAddresses:',
      error
    )
    return failure()
  }
}

const findUserAddresses = async (
  userId: UserId
): Promise<Result<AddressDTO[]>> => {
  try {
    const userAddresses = await db
      .select(addressSelectedFields)
      .from(addresses)
      .where(eq(addresses.userId, userId))
      .orderBy(desc(addresses.isDefault))

    return success(userAddresses)
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.findUserAddresses:',
      error
    )
    return failure()
  }
}

const updateUserAddress = async (
  userId: UserId,
  addressId: AddressId,
  addressData: AddressUpdateData
): Promise<Result<AddressDTO, NotFound>> => {
  try {
    const [updatedAddress] = await db
      .update(addresses)
      .set({
        city: addressData.city,
        country: addressData.country,
        isDefault: addressData.isDefault,
        postalCode: addressData.postalCode,
        street: addressData.street
      })
      .where(and(eq(addresses.id, addressId), eq(addresses.userId, userId)))
      .returning(addressSelectedFields)

    if (!updatedAddress) {
      return failure('NOT_FOUND')
    }

    return success(updatedAddress)
  } catch (error) {
    console.error(
      'Unknown error in AddressRepository.updateUserAddress:',
      error
    )
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
