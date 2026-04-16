import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

import { users } from '@/features/auth/infrastructure/auth-schema'
import { products } from '@/features/product/infrastructure/product-schema'

export const cartItems = pgTable(
  'cart_items',
  {
    createdAt: timestamp('createdAt', { withTimezone: false })
      .notNull()
      .defaultNow(),
    productId: uuid('productId')
      .notNull()
      .references(() => products.id),
    quantity: integer('quantity').notNull().default(1),
    updatedAt: timestamp('updatedAt', { withTimezone: false })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    userId: text('userId')
      .notNull()
      .references(() => users.id)
  },
  (table) => [primaryKey({ columns: [table.productId, table.userId] })]
)
