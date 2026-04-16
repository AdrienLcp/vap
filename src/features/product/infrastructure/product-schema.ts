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

import { categories } from '@/features/category/infrastructure/category-schema'
import { createId } from '@/infrastructure/database/identifiers'

export const productStatusEnum = pgEnum('ProductStatus', [
  'ACTIVE',
  'INACTIVE',
  'FEATURED'
])

export const products = pgTable(
  'products',
  {
    categoryId: uuid('categoryId').references(() => categories.id),
    createdAt: timestamp('createdAt', { withTimezone: false })
      .notNull()
      .defaultNow(),
    description: text('description'),
    discountedPrice: doublePrecision('discountedPrice'),
    id: uuid('id').primaryKey().$defaultFn(createId),
    imageUrl: text('imageUrl'),
    name: text('name').notNull(),
    price: doublePrecision('price').notNull(),
    salesCount: integer('salesCount').notNull().default(0),
    sku: text('sku').notNull(),
    status: productStatusEnum('status').notNull().default('ACTIVE'),
    stock: integer('stock').notNull().default(0),
    updatedAt: timestamp('updatedAt', { withTimezone: false })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [uniqueIndex('products_sku_key').on(table.sku)]
)

export type ProductStatus = (typeof productStatusEnum.enumValues)[number]
