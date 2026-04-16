# VAP — Project Instructions

E-commerce platform built with Next.js 16 + React 19 + strict TypeScript, following a feature-first / clean architecture approach.

## Language rule

**All code, docs, comments and files committed to this repo must be in English.** The only exception is the French i18n dictionary at `src/infrastructure/i18n/dictionaries/fr.ts`, which contains user-facing copy.

## Essential commands

```bash
pnpm dev              # Start Postgres (Docker), run migrations, start dev server
pnpm build            # Production build
pnpm lint             # Biome check (lint + format)
pnpm format           # Biome format --write
pnpm db:generate      # Write a new Drizzle migration from the TS schema
pnpm db:migrate       # Apply pending migrations (via tsx + drizzle-orm migrator)
pnpm db:seed          # Seed DB (tsx)
pnpm db:studio        # Drizzle Studio UI
pnpm auth:generate    # Regenerate Better Auth types
```

Package manager is **mandatory**: `pnpm` (10.27.0). Never use `npm` or `yarn`.

Postgres runs in Docker (see `docker-compose.yml`). `pnpm dev` boots the container, waits for it to be healthy, applies pending migrations, then starts Next.

## Stack

- Next.js 16.1.6 (App Router, Turbopack), React 19.2.4, TypeScript 5.9.3 strict
- Drizzle ORM 0.45 + `postgres` driver + PostgreSQL 16 (schemas dispatched per feature)
- Better Auth 1.6 (Google OAuth + email/password, via `drizzleAdapter`)
- Stripe 22 (integration in progress on the `stripe` branch)
- React Aria Components 1.16 (accessible UI, WCAG 2.1 AA)
- Zustand 5 (client state), Zod 4 (runtime validation), nuqs (URL state)
- SASS modules (no Tailwind)
- Biome 2.4 (unified lint + format, no ESLint/Prettier)
- UUID v7 (`uuidv7`) for application-generated IDs on business tables

## Feature-first architecture

```
src/
  app/               # Next.js App Router (pages, layouts, API routes)
  features/<name>/   # One folder per business domain
    domain/          # Entities, Zod schemas, constants, mappers
    application/     # Services (business logic), React hooks
    infrastructure/  # Drizzle schema + repository, API clients, external libs
    presentation/    # UI components, controllers (server-side)
  infrastructure/    # Shared technical services (db, auth, env, i18n)
  domain/            # Shared business entities
  presentation/      # Shared global UI components
  helpers/           # Result pattern
  utils/             # Generic helpers
```

Existing features: `address`, `admin`, `auth`, `cart`, `category`, `email`, `home`, `order`, `payment`, `product`, `user`.

## Absolute rules

1. **Result pattern, no exceptions.** Return `success(data)` / `failure(error)` from `@/helpers/result`. Never `throw` inside business logic.
2. **Strict TypeScript, zero `any`, zero casts.** If the type does not pass, fix the type.
3. **Server vs Client components:**
   - Server Components (async): call controllers directly (`await ProductController.findProducts()`).
   - Client Components (`'use client'`): call API clients (`ProductClient.findProducts()`) that fetch `/api/*` routes.
4. **`t()` i18n is client-only.** Import: `import { t } from '@/infrastructure/i18n'`. Do not use it inside server components (preparation for a future context).
5. **Accessibility is mandatory:** use React Aria Components, no `<div onClick>`, keyboard navigation, ARIA labels.
6. **Runtime Zod validation** for every external input (API body, query params, form data).
7. **No `console.log`:** only `console.error`, `console.warn`, `console.info` are allowed (Biome rule).
8. **Max 100 lines per function** (Biome rule `noExcessiveLinesPerFunction`).
9. **Path alias:** always `@/*` for internal imports (never `../../../`).
10. **Drizzle schemas live per feature** at `src/features/<name>/infrastructure/<name>-schema.ts`, re-exported from `src/infrastructure/database/schema.ts`.

## Biome conventions (enforced)

- No semicolons
- Single quotes (including JSX)
- 2-space indentation
- Trailing commas: none
- Arrow functions: no parentheses around a single parameter
- Imports auto-sorted (server-only/use client at the top, then packages, then `@/`, then relatives)
- `pnpm lint` must pass before every commit

## Database

Schemas are dispatched per feature under `src/features/<name>/infrastructure/<name>-schema.ts` and aggregated in `src/infrastructure/database/schema.ts`.

Tables:
- **auth** (owned by Better Auth): `users`, `sessions`, `accounts`, `verifications` — `text` primary keys (Better Auth-generated nanoid strings). Enum `Role` (USER/ADMIN/SUPER_ADMIN).
- **business** (application-generated UUID v7 primary keys via `createId()`): `categories`, `products`, `addresses`, `orders`, `order_items`.
- **cart_items**: composite primary key `(productId, userId)` where `productId` is `uuid` and `userId` is `text`.

Enums: `Role`, `ProductStatus` (ACTIVE/INACTIVE/FEATURED), `OrderStatus` (CANCELLED/COMPLETED/PAID/PENDING/SHIPPED).

After any schema change: `pnpm db:generate` (writes the SQL migration file), then `pnpm db:migrate` (applies it). `pnpm dev` runs `db:migrate` automatically.

## Environment

`.env` file (copy from `.env.example`):

```
AUTH_GOOGLE_CLIENT_ID=""
AUTH_GOOGLE_CLIENT_SECRET=""
BETTER_AUTH_SECRET=""
DATABASE_URL="postgres://vap:vap@localhost:5432/vap"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
RESEND_API_KEY=""
STRIPE_API_KEY=""
STRIPE_WEBHOOK_SECRET=""
```

Validated via `@t3-oss/env-nextjs` in `src/infrastructure/env/`.

## Resources for Claude

Detailed docs live in `docs/`:

- `docs/getting-started.md` — onboarding for new developers
- `docs/architecture.md` — feature-first, clean architecture, data flow
- `docs/stack.md` — tech stack with versions
- `docs/database.md` — Drizzle schemas, tables, relations, enums
- `docs/authentication.md` — Better Auth, OAuth, roles
- `docs/conventions.md` — Biome, TypeScript, Result pattern
- `docs/feature-guide.md` — how to create or modify a feature

Detailed rules: `.claude/rules.md`.

## Current branch

Branch `drizzle-migration`: migration from Prisma to Drizzle. Business tables use native `uuid` column type + application-generated UUID v7. Postgres runs in Docker. Prisma has been fully removed.
