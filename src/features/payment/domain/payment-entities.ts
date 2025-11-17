import type { z } from 'zod'

import type {
  PaymentMethodDTOSchema,
  PaymentMethodIdSchema,
  PaymentMethodProviderSchema
} from '@/features/payment/domain/payment-schemas'

export type PaymentMethodId = z.infer<typeof PaymentMethodIdSchema>

export type PaymentMethod = z.infer<typeof PaymentMethodDTOSchema>

export type PaymentMethodProvider = z.infer<typeof PaymentMethodProviderSchema>

export type PaymentMethodDTO = z.infer<typeof PaymentMethodDTOSchema>
