# Database

PostgreSQL 16 accessed through **Drizzle ORM** 0.45 with the `postgres` driver. Schemas are dispatched per feature to match the feature-first architecture.

## Runtime setup

Postgres runs in a Docker container defined in `docker-compose.yml` at the repo root:

- Image: `postgres:16-alpine`
- Port: `5432` (host) → `5432` (container)
- Credentials: `vap` / `vap`, database `vap`
- Persistent volume: `vap-postgres-data`
- Healthcheck: `pg_isready`, so `docker compose up --wait` blocks until Postgres accepts connections

`pnpm dev` runs `docker compose up -d --wait && pnpm db:migrate && next dev --turbopack`, so a single command brings up the DB, applies pending migrations, and starts the app.

## Connection

Entry point: `src/infrastructure/database/index.ts`.

```ts
import 'server-only'

import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import { SERVER_ENV } from '@/infrastructure/env/server'
import * as schema from '@/infrastructure/database/schema'

const pgClient = postgres(SERVER_ENV.DATABASE_URL, { prepare: false })

export const db = drizzle(pgClient, { schema })
```

`db` is a singleton across HMR reloads in dev.

## Schema layout

Each business feature owns its own Drizzle schema file. The central barrel re-exports everything.

```
src/features/
  address/infrastructure/address-schema.ts       # addresses
  auth/infrastructure/auth-schema.ts             # users, sessions, accounts, verifications + roleEnum
  cart/infrastructure/cart-schema.ts             # cart_items (composite PK)
  category/infrastructure/category-schema.ts     # categories
  order/infrastructure/order-schema.ts           # orders, order_items + orderStatusEnum
  product/infrastructure/product-schema.ts       # products + productStatusEnum
src/infrastructure/database/
  schema.ts           # re-exports every feature schema (barrel)
  index.ts            # db client
  identifiers.ts      # createId() → UUID v7
  database-helpers.ts # Postgres error mapping (unique violation, etc.)
  database-migrate.ts # programmatic migration runner (tsx)
  database-seed.ts    # seed script (tsx)
  migrations/         # SQL files produced by drizzle-kit
drizzle.config.ts     # drizzle-kit config (at repo root)
```

## Tables

### Auth (owned by Better Auth)

`users.id`, `sessions.id`, `accounts.id`, `verifications.id` are `text` because Better Auth generates nanoid-style strings internally (not UUIDs).

| Table | Purpose |
|---|---|
| **users** | User account. Fields: `id`, `name`, `email` (unique), `emailVerified`, `image`, `role` (`USER`/`ADMIN`/`SUPER_ADMIN`), timestamps. |
| **sessions** | Active sessions. Tracks `token` (unique), `expiresAt`, `ipAddress`, `userAgent`. Cascade on user delete. |
| **accounts** | OAuth providers (Google, credentials). Stores `providerId`, tokens, expirations, and password hashes. Cascade on user delete. |
| **verifications** | Email/password verification codes. |

### Catalog

Business tables use native Postgres `uuid` column type, with IDs generated at the app level as UUID v7 via `createId()`.

| Table | Purpose |
|---|---|
| **categories** | Product category. Fields: `id` (uuid), `name` (unique), `description`, `imageUrl`. Has many products. |
| **products** | Catalog entry. Fields: `id` (uuid), `name`, `description`, `price`, `discountedPrice`, `stock`, `salesCount`, `sku` (unique), `imageUrl`, `status` (`ACTIVE`/`INACTIVE`/`FEATURED`), `categoryId` (uuid → categories). |

### Cart & orders

| Table | Purpose |
|---|---|
| **cart_items** | Item in a user's cart. Composite primary key `(productId, userId)`. `productId` is `uuid` (FK to products), `userId` is `text` (FK to users). |
| **orders** | User order. Fields: `id` (uuid), `userId` (text), `shippingAddressId` (uuid), `stripeCheckoutSessionId` (unique, nullable), `stripePaymentIntentId` (unique, nullable), `totalPrice`, `status` (`PENDING`/`PAID`/`SHIPPED`/`COMPLETED`/`CANCELLED`). |
| **order_items** | Line item in an order. Fields: `id` (uuid), `orderId` (uuid), `productId` (uuid), `quantity`, `price` (snapshot at order time). |

### User data

| Table | Purpose |
|---|---|
| **addresses** | Shipping address. Fields: `id` (uuid), `userId` (text), `name`, `street`, `city`, `postalCode`, `country`, `isDefault`. |

## Enums

Postgres enums generated from Drizzle:

```ts
export const roleEnum = pgEnum('Role', ['USER', 'ADMIN', 'SUPER_ADMIN'])
export const productStatusEnum = pgEnum('ProductStatus', ['ACTIVE', 'INACTIVE', 'FEATURED'])
export const orderStatusEnum = pgEnum('OrderStatus', ['CANCELLED', 'COMPLETED', 'PAID', 'PENDING', 'SHIPPED'])
```

Type-level access in code:

```ts
import type { Role } from '@/features/auth/infrastructure/auth-schema'
import type { ProductStatus } from '@/features/product/infrastructure/product-schema'
import type { OrderStatus } from '@/features/order/infrastructure/order-schema'
```

## Relations summary

```
User ───1:N─── Session
User ───1:N─── Account
User ───1:N─── CartItem ───N:1─── Product
User ───1:N─── Order ───N:1─── Address
                   └── 1:N ─── OrderItem ───N:1─── Product
User ───1:N─── Address
Category ───1:N─── Product
```

## Identifiers

Business tables use **UUID v7** generated at the application level:

```ts
// src/infrastructure/database/identifiers.ts
import { uuidv7 } from 'uuidv7'

export const createId = (): string => uuidv7()
```

Wired into every business schema via `$defaultFn`:

```ts
id: uuid('id').primaryKey().$defaultFn(createId)
```

UUID v7 is time-ordered, which keeps Postgres index insertion monotonic (cheaper than UUID v4). Zod IDs validate with `z.uuid()` in `*-schemas.ts` files.

## Usage from code

```ts
import { eq } from 'drizzle-orm'
import { db } from '@/infrastructure/database'
import { products } from '@/features/product/infrastructure/product-schema'

const rows = await db
  .select({ id: products.id, name: products.name })
  .from(products)
  .where(eq(products.id, someId))
  .limit(1)
```

**Only repositories (`infrastructure/*-repository.ts`) are allowed to call `db.*`.** Services, controllers and components go through the repository.

## Migrations

```bash
# Write a new SQL migration file from the current TS schema (does not touch the DB)
pnpm db:generate

# Apply pending migrations to the DB pointed at by DATABASE_URL
pnpm db:migrate

# Open Drizzle Studio (UI at https://local.drizzle.studio)
pnpm db:studio
```

- `db:generate` uses `drizzle-kit generate` — outputs a timestamped SQL file under `src/infrastructure/database/migrations/`. Review and commit it.
- `db:migrate` runs `tsx src/infrastructure/database/database-migrate.ts` — a small programmatic wrapper around `drizzle-orm/postgres-js/migrator`. Non-interactive, works reliably on every terminal (including Git Bash, where the `drizzle-kit` CLI spinner tends to hang).
- `db:migrate` is also invoked by `pnpm dev`, so after a `git pull` the DB catches up automatically on the next dev run.

### Writing a migration

1. Edit the relevant `*-schema.ts` file in the feature's `infrastructure/`.
2. Add the barrel export if the file is new (`src/infrastructure/database/schema.ts`).
3. Run `pnpm db:generate`.
4. Review the generated SQL, rename the file if helpful, and commit it.
5. `pnpm db:migrate` (or `pnpm dev`) applies it.

### Safe practices

- Destructive changes (drop column, rename) split across two migrations whenever rolling deploys may run old code against the new schema.
- Adding a non-null column: provide a default, or run a backfill migration first.
- Rename column: add-new + backfill + drop-old when the code path is live.
- Never edit a migration file that was already committed and applied to shared environments — write a new one.

## Seeding

Seed script: `src/infrastructure/database/database-seed.ts`. Run it with:

```bash
pnpm db:seed
```

It runs through `tsx`, so you can keep it in TypeScript. Add development fixtures (categories, sample products, an admin user) there.

## Drizzle Studio

```bash
pnpm db:studio
```

Opens a UI for inspecting and editing rows. Handy for debugging, not for production data management. Note: like most `drizzle-kit` CLI commands, Studio works best on PowerShell / cmd on Windows — the Git Bash wrapper sometimes buffers poorly.

## Error mapping

`src/infrastructure/database/database-helpers.ts` inspects thrown `postgres.PostgresError` instances to normalise conflicts:

```ts
const dbError = getDatabaseError(error)
if (dbError.code === 'DUPLICATE') {
  // dbError.duplicatedKeys holds the column names parsed from the constraint name
}
```

This is what repositories use to distinguish unique-constraint violations (SQLSTATE `23505`) from unexpected failures.

## Common gotchas

- **`db:migrate` fails with `auth_failed`**: a host-level Postgres is listening on 5432 alongside Docker. Stop the host service (e.g. `postgresql-x64-XX` on Windows) or change the Docker port in `docker-compose.yml`.
- **`db:generate` shows no changes when you edited a schema**: make sure the new table is re-exported from `src/infrastructure/database/schema.ts`.
- **Types for `OrderStatus` / `ProductStatus` / `Role` not updating**: they are derived from the Drizzle enum definitions — re-import from the schema file (`@/features/<name>/infrastructure/<name>-schema`).
- **`tsx` not found** when seeding or migrating: it is in `devDependencies`; a fresh `pnpm install` fixes it.
