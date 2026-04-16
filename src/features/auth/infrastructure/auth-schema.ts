import {
  boolean,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex
} from 'drizzle-orm/pg-core'

export const roleEnum = pgEnum('Role', ['USER', 'ADMIN', 'SUPER_ADMIN'])

export const users = pgTable(
  'users',
  {
    createdAt: timestamp('createdAt', { withTimezone: false }).notNull(),
    email: text('email').notNull(),
    emailVerified: boolean('emailVerified').notNull(),
    id: text('id').primaryKey(),
    image: text('image'),
    name: text('name').notNull(),
    role: roleEnum('role').notNull().default('USER'),
    updatedAt: timestamp('updatedAt', { withTimezone: false }).notNull()
  },
  (table) => [uniqueIndex('users_email_key').on(table.email)]
)

export const sessions = pgTable(
  'sessions',
  {
    createdAt: timestamp('createdAt', { withTimezone: false }).notNull(),
    expiresAt: timestamp('expiresAt', { withTimezone: false }).notNull(),
    id: text('id').primaryKey(),
    ipAddress: text('ipAddress'),
    token: text('token').notNull(),
    updatedAt: timestamp('updatedAt', { withTimezone: false }).notNull(),
    userAgent: text('userAgent'),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' })
  },
  (table) => [uniqueIndex('sessions_token_key').on(table.token)]
)

export const accounts = pgTable('accounts', {
  accessToken: text('accessToken'),
  accessTokenExpiresAt: timestamp('accessTokenExpiresAt', {
    withTimezone: false
  }),
  accountId: text('accountId').notNull(),
  createdAt: timestamp('createdAt', { withTimezone: false }).notNull(),
  id: text('id').primaryKey(),
  idToken: text('idToken'),
  password: text('password'),
  providerId: text('providerId').notNull(),
  refreshToken: text('refreshToken'),
  refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt', {
    withTimezone: false
  }),
  scope: text('scope'),
  updatedAt: timestamp('updatedAt', { withTimezone: false }).notNull(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' })
})

export const verifications = pgTable('verifications', {
  createdAt: timestamp('createdAt', { withTimezone: false }),
  expiresAt: timestamp('expiresAt', { withTimezone: false }).notNull(),
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  updatedAt: timestamp('updatedAt', { withTimezone: false }),
  value: text('value').notNull()
})

export type Role = (typeof roleEnum.enumValues)[number]
