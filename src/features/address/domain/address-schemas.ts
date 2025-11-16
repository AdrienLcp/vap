import { z } from 'zod'

export const AddressIdSchema = z.string()
export const AddressCitySchema = z.string()
export const AddressStreetSchema = z.string()
export const AddressPostalCodeSchema = z.string()
export const AddressCountrySchema = z.string()

export const AddressDTOSchema = z.object({
  city: AddressCitySchema,
  country: AddressCountrySchema,
  id: AddressIdSchema,
  isDefault: z.boolean(),
  postalCode: AddressPostalCodeSchema,
  street: AddressStreetSchema
})
