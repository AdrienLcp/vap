---
description: Drizzle schemas and migrations, why two kinds of primary key, Better Auth, Stripe keys
paths:
  - src/infrastructure/database/**
  - src/infrastructure/env/**
  - src/features/*/infrastructure/**
---

# Database, authentication, payment

## Schemas are per feature, aggregated in one barrel

A table is defined in `src/features/<name>/infrastructure/<name>-schema.ts` and
re-exported from `src/infrastructure/database/schema.ts`, which is what Drizzle
Kit reads.

To change the schema: edit the feature's `*-schema.ts`, then `pnpm db:generate`
(writes the SQL migration), then `pnpm db:migrate` (applies it). `pnpm dev` runs
`db:migrate` on its own.

- **Never edit a migration that has been committed and applied** to a shared
  environment — write a new one.
- **A destructive migration** — dropped column, rename — is announced to the
  user before it runs.
- Prefer `pnpm db:migrate` over `drizzle-kit migrate`: the CLI spinner hangs on
  Git Bash.

Seed script: `src/infrastructure/database/database-seed.ts`. Migration runner:
`src/infrastructure/database/database-migrate.ts`.

## Two kinds of primary key, and the split is not a taste

- **Business tables** — `categories`, `products`, `addresses`, `orders`,
  `order_items` — use a native `uuid` column filled by `createId()` (UUID v7).
- **Auth tables**, owned by Better Auth — `users`, `sessions`, `accounts`,
  `verifications` — use `text`, because Better Auth generates nanoid-style ids
  and does not ask.
- `cart_items` has a composite primary key `(productId, userId)`, so `uuid` and
  `text` sit side by side there.

Enums: `Role` (USER / ADMIN / SUPER_ADMIN), `ProductStatus` (ACTIVE / INACTIVE /
FEATURED), `OrderStatus` (CANCELLED / COMPLETED / PAID / PENDING / SHIPPED).

Tables, relations and the full picture: [`docs/database.md`](../../docs/database.md).

## Better Auth

Configuration lives in `src/features/auth/infrastructure/auth-lib.ts`. **Run
`pnpm auth:generate` after any change to it** — the generated types go stale
silently otherwise.

Roles are checked **server-side**. A role read in the client is a display
detail, never a gate. See [`docs/authentication.md`](../../docs/authentication.md).

## Stripe

The SDK is instantiated in
`src/features/payment/infrastructure/payment-lib.ts`, with `STRIPE_API_KEY` from
`.env`. Always the **test** key in dev; a live key is never committed. A webhook
signature is validated before anything is processed.

## Environment

`.env` is copied from `.env.example` — that file is the authoritative list of
variables. They are validated by `@t3-oss/env-nextjs` in
`src/infrastructure/env/`, so a missing one fails the boot rather than a request.
