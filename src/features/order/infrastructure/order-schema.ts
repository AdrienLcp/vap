import {
  doublePrecision,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core'

import { addresses } from '@/features/address/infrastructure/address-schema'
import { users } from '@/features/auth/infrastructure/auth-schema'
import { products } from '@/features/product/infrastructure/product-schema'
import { createId } from '@/infrastructure/database/identifiers'

export const orderStatusEnum = pgEnum('OrderStatus', [
  'CANCELLED',
  'COMPLETED',
  'PAID',
  'PENDING',
  'SHIPPED'
])

export const orders = pgTable(
  'orders',
  {
    createdAt: timestamp('createdAt', { withTimezone: false })
      .notNull()
      .defaultNow(),
    id: uuid('id').primaryKey().$defaultFn(createId),
    shippingAddressId: uuid('shippingAddressId')
      .notNull()
      .references(() => addresses.id),
    status: orderStatusEnum('status').notNull().default('PENDING'),
    stripeCheckoutSessionId: text('stripeCheckoutSessionId'),
    stripePaymentIntentId: text('stripePaymentIntentId'),
    totalPrice: doublePrecision('totalPrice').notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: false })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    userId: text('userId')
      .notNull()
      .references(() => users.id)
  },
  (table) => [
    uniqueIndex('orders_stripeCheckoutSessionId_key').on(
      table.stripeCheckoutSessionId
    ),
    uniqueIndex('orders_stripePaymentIntentId_key').on(
      table.stripePaymentIntentId
    )
  ]
)

export const orderItems = pgTable('order_items', {
  createdAt: timestamp('createdAt', { withTimezone: false })
    .notNull()
    .defaultNow(),
  id: uuid('id').primaryKey().$defaultFn(createId),
  orderId: uuid('orderId')
    .notNull()
    .references(() => orders.id),
  price: doublePrecision('price').notNull(),
  productId: uuid('productId')
    .notNull()
    .references(() => products.id),
  quantity: integer('quantity').notNull().default(1),
  updatedAt: timestamp('updatedAt', { withTimezone: false })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date())
})

export type OrderStatus = (typeof orderStatusEnum.enumValues)[number]
