import type { z } from 'zod'

import type {
  OrderCreationDataSchema,
  OrderDTOSchema,
  OrderIdSchema,
  OrderItemDTOSchema,
  OrderItemProductCategoryDTOSchema,
  OrderItemProductDTOSchema,
  OrderStatusSchema
} from '@/features/order/domain/order-schemas'

export type OrderId = z.infer<typeof OrderIdSchema>

export type OrderStatus = z.infer<typeof OrderStatusSchema>

export type OrderItemProductCategoryDTO = z.infer<typeof OrderItemProductCategoryDTOSchema>

export type OrderItemProductDTO = z.infer<typeof OrderItemProductDTOSchema>

export type OrderItemDTO = z.infer<typeof OrderItemDTOSchema>

export type OrderDTO = z.infer<typeof OrderDTOSchema>

export type OrderCreationData = z.infer<typeof OrderCreationDataSchema>
