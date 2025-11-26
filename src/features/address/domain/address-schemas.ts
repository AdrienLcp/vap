import { z } from 'zod'
import { ADDRESS_ERRORS } from './address-constants'

export const AddressIdSchema = z.cuid()
export const AddressCitySchema = z.string(ADDRESS_ERRORS.INVALID_CITY).trim()
export const AddressCountrySchema = z.string(ADDRESS_ERRORS.INVALID_COUNTRY).trim()
export const AddressNameSchema = z.string(ADDRESS_ERRORS.INVALID_NAME).trim()
export const AddressStreetSchema = z.string(ADDRESS_ERRORS.INVALID_STREET).trim()
export const AddressPostalCodeSchema = z.string(ADDRESS_ERRORS.INVALID_POSTAL_CODE).trim()

export const AddressDTOSchema = z.object({
  city: AddressCitySchema.catch(''),
  country: AddressCountrySchema.catch(''),
  id: AddressIdSchema,
  isDefault: z.boolean().catch(false),
  name: AddressNameSchema.catch(''),
  postalCode: AddressPostalCodeSchema.catch(''),
  street: AddressStreetSchema.catch('')
})

export const AddressCreationSchema = AddressDTOSchema.omit({ id: true })

export const AddressUpdateSchema = z.object({
  city: AddressCitySchema.optional().catch(undefined),
  country: AddressCountrySchema.optional().catch(undefined),
  isDefault: z.boolean().optional().catch(undefined),
  name: AddressNameSchema.optional().catch(undefined),
  postalCode: AddressPostalCodeSchema.optional().catch(undefined),
  street: AddressStreetSchema.optional().catch(undefined)
})
