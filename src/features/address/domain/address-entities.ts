import type z from 'zod'

import type { AddressDTOSchema } from '@/features/address/domain/address-schemas'

export type AddressDTO = z.infer<typeof AddressDTOSchema>
