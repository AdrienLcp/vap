import type { z } from 'zod'

import type {
  PaymentMethodCreationSchema,
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodProviderSchema
} from '@/features/payment/domain/payment-schemas'

export type PaymentMethodId = z.infer<typeof PaymentMethodIdSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethodCreationData = z.infer<typeof PaymentMethodCreationSchema>

export type PaymentMethodCreationDTO = z.infer<typeof PaymentMethodCreationDTOSchema>
