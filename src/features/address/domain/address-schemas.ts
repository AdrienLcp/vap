import { z } from 'zod'

export const AddressIdSchema = z.cuid()
export const AddressCitySchema = z.string().trim()
export const AddressStreetSchema = z.string().trim()
export const AddressPostalCodeSchema = z.string().trim()
export const AddressCountrySchema = z.string().trim()

export const AddressDTOSchema = z.object({
  city: AddressCitySchema,
  country: AddressCountrySchema,
  id: AddressIdSchema,
  isDefault: z.boolean(),
  postalCode: AddressPostalCodeSchema,
  street: AddressStreetSchema
})

export const AddressCreationSchema = AddressDTOSchema.omit({ id: true })

export const AddressUpdateSchema = z.object({
  city: AddressCitySchema.optional(),
  country: AddressCountrySchema.optional(),
  isDefault: z.boolean(),
  postalCode: AddressPostalCodeSchema,
  street: AddressStreetSchema
})
