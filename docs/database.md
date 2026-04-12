# Database

PostgreSQL accessed through Prisma 7. Schema location: `src/infrastructure/database/schema.prisma`.

## Configuration

- **Datasource**: `postgresql` (provider)
- **Generator**: `prisma-client-js`, output to `src/infrastructure/database/generated/`
- **Config file**: `prisma.config.ts` wires Prisma to the schema, migration folder, and seed script.

```ts
// prisma.config.ts
const DATABASE_PATH = 'src/infrastructure/database'

export default defineConfig({
  datasource: { url: env('DATABASE_URL') },
  migrations: {
    path: `${DATABASE_PATH}/migrations`,
    seed: `tsx ${DATABASE_PATH}/database-seed.ts`
  },
  schema: `${DATABASE_PATH}/schema.prisma`
})
```

## Models

The schema defines 11 models. Below is a quick reference. See `schema.prisma` for the full definition.

### Auth (Better Auth-managed)

These are owned by Better Auth but stored in the same database.

| Model | Purpose |
|---|---|
| **User** | User account. Fields: `id`, `name`, `email` (unique), `emailVerified`, `image`, `role` (`USER`/`ADMIN`/`SUPER_ADMIN`). Relations: sessions, accounts, cartItems, orders, addresses, paymentMethods. |
| **Session** | Active sessions. Tracks `token` (unique), `expiresAt`, `ipAddress`, `userAgent`. Cascade on user delete. |
| **Account** | OAuth providers (Google, credentials). Stores `providerId`, tokens, expirations, and password hashes for credentials. Cascade on user delete. |
| **Verification** | Email/password verification codes. |

### Catalog

| Model | Purpose |
|---|---|
| **Category** | Product category. Fields: `id` (cuid), `name` (unique), `description`, `imageUrl`. Has many products. |
| **Product** | Catalog entry. Fields: `id`, `name`, `description`, `price`, `discountedPrice`, `stock`, `salesCount`, `sku` (unique), `imageUrl`, `status` (`ACTIVE`/`INACTIVE`/`FEATURED`), `categoryId`. Has many orderItems and cartItems. |

### Cart & orders

| Model | Purpose |
|---|---|
| **CartItem** | Item in a user's cart. Composite primary key: `(productId, userId)`. Fields: `quantity`. |
| **Order** | User order. Fields: `id`, `userId`, `shippingAddressId`, `paymentMethodId`, `totalPrice`, `status` (`PENDING`/`PAID`/`SHIPPED`/`COMPLETED`/`CANCELLED`). Has many orderItems. |
| **OrderItem** | Line item in an order. Fields: `id`, `orderId`, `productId`, `quantity`, `price` (price at the time of the order). |

### User data

| Model | Purpose |
|---|---|
| **Address** | Shipping address. Fields: `id`, `userId`, `name`, `street`, `city`, `postalCode`, `country`, `isDefault`. Has many orders. |
| **PaymentMethod** | Saved payment method. Fields: `id`, `userId`, `name`, `type` (`BANK_TRANSFER`/`CREDIT_CARD`/`DEBIT_CARD`/`PAYPAL`), `provider` (`STRIPE`), `last4`, `expiryMonth`, `expiryYear`, `isDefault`. Has many orders. |

## Enums

```prisma
enum Role {
  USER
  ADMIN
  SUPER_ADMIN
}

enum ProductStatus {
  ACTIVE
  INACTIVE
  FEATURED
}

enum OrderStatus {
  CANCELLED
  COMPLETED
  PAID
  PENDING
  SHIPPED
}

enum PaymentType {
  BANK_TRANSFER
  CREDIT_CARD
  DEBIT_CARD
  PAYPAL
}

enum PaymentProvider {
  STRIPE
}
```

## Table naming

All models use `@@map("snake_case_plural")` so the SQL tables are `users`, `sessions`, `accounts`, `verifications`, `categories`, `products`, `cart_items`, `addresses`, `payment_methods`, `orders`, `order_items`.

## Relations summary

```
User ───1:N─── Session
User ───1:N─── Account
User ───1:N─── CartItem ───N:1─── Product
User ───1:N─── Order ───N:1─── Address
                   │─── N:1 ─── PaymentMethod
                   │─── 1:N ─── OrderItem ───N:1─── Product
User ───1:N─── Address
User ───1:N─── PaymentMethod
Category ───1:N─── Product
```

## Usage from code

Prisma client is imported from `src/infrastructure/database/`:

```ts
import { prisma } from '@/infrastructure/database'

const users = await prisma.user.findMany()
```

**Only repositories (`infrastructure/*-repository.ts`) are allowed to call `prisma.*`.** Services, controllers and components go through the repository.

## Migrations

```bash
# Create a new migration (prompts for a name)
pnpm db:migrate

# Better: name it explicitly
pnpm exec prisma migrate dev --name add_product_sku

# Apply existing migrations (no new ones) — useful in CI or after pulling
pnpm exec prisma migrate deploy

# Regenerate the client after editing the schema without migrating
pnpm db:generate

# Reset the DB (⚠️ destroys data) — dev only
pnpm exec prisma migrate reset
```

Migrations are stored in `src/infrastructure/database/migrations/`. Each migration is a timestamped folder with a `migration.sql` file. Never edit a migration after it has been committed and shared.

### Safe practices

- Destructive changes (drop column, rename) should be split across two migrations whenever a rolling deploy is at risk of running the old code against the new schema.
- Adding a non-null column: provide a default, or run a backfill first.
- Renaming a column: prefer add-new + backfill + drop-old over an in-place rename when the code path is live.

## Seeding

Seed script: `src/infrastructure/database/database-seed.ts`. Run it with:

```bash
pnpm db:seed
```

The script is executed with `tsx`, so you can keep it in TypeScript. Put any development fixtures there (categories, sample products, an admin user).

## Prisma Studio

```bash
pnpm db:studio
```

Opens a UI at http://localhost:5555 for inspecting and editing rows. Handy for debugging, not for production data management.

## Generated client

The generated client lives at `src/infrastructure/database/generated/` and is committed. **Never edit files in this folder manually** — they are regenerated by `prisma generate` (and by `postinstall`). Biome ignores this folder via `biome.json`.

## Common gotchas

- **Prisma binary mismatch** after a Node upgrade: run `pnpm db:generate`.
- **Shadow database** errors on `migrate dev`: make sure the DB user has `CREATEDB` permission, or pass `--shadow-database-url`.
- **Long-running dev migrations**: the first migration of the day may be slow if the engine cache is cold.
- **`tsx` not found** when seeding: it is in `devDependencies`; a fresh `pnpm install` fixes it.
