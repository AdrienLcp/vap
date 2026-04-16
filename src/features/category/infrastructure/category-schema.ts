import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from 'drizzle-orm/pg-core'

import { createId } from '@/infrastructure/database/identifiers'

export const categories = pgTable(
  'categories',
  {
    createdAt: timestamp('createdAt', { withTimezone: false })
      .notNull()
      .defaultNow(),
    description: text('description'),
    id: uuid('id').primaryKey().$defaultFn(createId),
    imageUrl: text('imageUrl'),
    name: text('name').notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: false })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  (table) => [uniqueIndex('categories_name_key').on(table.name)]
)
