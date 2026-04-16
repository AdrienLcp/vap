import { boolean, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

import { users } from '@/features/auth/infrastructure/auth-schema'
import { createId } from '@/infrastructure/database/identifiers'

export const addresses = pgTable('addresses', {
  city: text('city').notNull(),
  country: text('country').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: false })
    .notNull()
    .defaultNow(),
  id: uuid('id').primaryKey().$defaultFn(createId),
  isDefault: boolean('isDefault').notNull().default(false),
  name: text('name').notNull(),
  postalCode: text('postalCode').notNull(),
  street: text('street').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: false })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  userId: text('userId')
    .notNull()
    .references(() => users.id)
})
