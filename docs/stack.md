# Tech Stack

All versions are pinned in `package.json`. This doc describes what each dependency does and why it was picked.

## Runtime & language

| Tool | Version | Role |
|---|---|---|
| **Node.js** | ≥ 20 LTS | JS runtime |
| **pnpm** | 10.27.0 | Package manager (mandatory) |
| **TypeScript** | 5.9.3 | Strict typing, no `any` tolerated |

TypeScript is configured with `strict: true`, `isolatedModules`, `noEmit`, and the `@/*` path alias pointing at `./src/*` (see `tsconfig.json`).

## Framework

| Package | Version | Role |
|---|---|---|
| **next** | 16.1.6 | Framework (App Router, Turbopack, Server Components) |
| **react** | 19.2.4 | UI library |
| **react-dom** | 19.2.4 | DOM renderer |
| **server-only** | 0.0.1 | Mark modules that must stay server-side |

The dev server uses **Turbopack** (`next dev --turbopack`), which is noticeably faster than webpack for HMR.

## Database & ORM

| Package | Version | Role |
|---|---|---|
| **drizzle-orm** | ^0.45 | Type-safe SQL builder / ORM |
| **postgres** | ^3.4 | PostgreSQL driver (used at runtime) |
| **drizzle-kit** | ^0.31 | CLI for generating migrations and opening Drizzle Studio |
| **uuidv7** | ^1.2 | Time-ordered UUID generator for app-side IDs |

PostgreSQL 16 runs in a Docker container defined in `docker-compose.yml`. Schemas are **dispatched per feature** under `src/features/<name>/infrastructure/<name>-schema.ts` and aggregated in the barrel `src/infrastructure/database/schema.ts`.

Drizzle's config lives at `drizzle.config.ts` (repo root), pointing at the barrel for schema discovery and at `src/infrastructure/database/migrations/` for generated SQL files.

Migration runner: `src/infrastructure/database/database-migrate.ts` (programmatic wrapper around `drizzle-orm/postgres-js/migrator`, invoked via `tsx`). Preferred over `drizzle-kit migrate` because the CLI spinner hangs on Git Bash / non-TTY terminals.

## Authentication

| Package | Version | Role |
|---|---|---|
| **better-auth** | ^1.6 | Modern auth library (sessions, OAuth, email/password) |
| **js-sha256** | ^0.11 | Cryptographic hashing |

Better Auth is set up in `src/features/auth/infrastructure/auth-lib.ts`, using the **Drizzle adapter** (`better-auth/adapters/drizzle`, provider `'pg'`) with:

- Email + password login
- Google OAuth
- User deletion & email change enabled
- An additive `role` field (`USER` / `ADMIN` / `SUPER_ADMIN`)

After any auth config change, run `pnpm auth:generate` to regenerate types.

## Payment

| Package | Version | Role |
|---|---|---|
| **stripe** | ^22 | Stripe server SDK |

Instantiated in `src/features/payment/infrastructure/payment-lib.ts`. The `payment` feature holds its domain entities, schemas, service, repository and client. Stripe webhooks land at `/api/webhooks/stripe` and are verified with `STRIPE_WEBHOOK_SECRET`.

## Email

| Package | Version | Role |
|---|---|---|
| **resend** | ^6 | Transactional email delivery |
| **@react-email/components** | ^1 | React-based email templates |

Email sender in `src/features/email/infrastructure/email-sender.ts`. Templates live under `src/features/email/presentation/templates/`.

## UI & accessibility

| Package | Version | Role |
|---|---|---|
| **react-aria-components** | ^1.16 | Adobe-backed accessible UI primitives (WCAG 2.1 AA) |
| **lucide-react** | ^1.8 | Icon set |
| **classnames** | ^2.5 | Conditional class composition |
| **sass** | ^1.99 | SASS modules for styling |

No Tailwind, no styled-components, no CSS-in-JS. Every component ships with a `Component.module.sass` file next to it.

## State & data fetching

| Package | Version | Role |
|---|---|---|
| **zustand** | ^5 | Client-side state (cart, UI state) |
| **nuqs** | ^2.8 | Type-safe state in the URL query string |

Server data lives in server components; client components use Zustand for UI state and call API clients for data.

## Validation

| Package | Version | Role |
|---|---|---|
| **zod** | ^4 | Runtime schemas and validation |
| **@t3-oss/env-nextjs** | ^0.13 | Validate environment variables at boot |
| **dotenv** | ^17 | Load `.env` during scripts (seed, migrate) |

Every external input (API route body, query params, form data) is validated with a Zod schema before reaching a service.

## Dev tooling

| Package | Version | Role |
|---|---|---|
| **@biomejs/biome** | 2.4 | Unified linter + formatter + import sorter |
| **tsx** | ^4 | Run TS files directly (used by seed and migrate) |
| **@types/node** | ^25 | Node type definitions |
| **@types/react** | 19.2 | React type definitions |
| **@types/react-dom** | 19.2 | React DOM type definitions |

No ESLint, no Prettier. Biome handles lint + format + import sorting in a single fast pass. Config in `biome.json`.

## Build & dev scripts (package.json)

| Script | Command | Purpose |
|---|---|---|
| `dev` | `docker compose up -d --wait && pnpm db:migrate && next dev --turbopack` | Boot Postgres, migrate, start Next |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve the production build |
| `lint` | `biome check --write` | Lint + format |
| `format` | `biome format --write` | Apply formatting |
| `db:generate` | `drizzle-kit generate` | Write a new SQL migration file from the TS schema |
| `db:migrate` | `tsx src/infrastructure/database/database-migrate.ts` | Apply pending migrations |
| `db:seed` | `tsx src/infrastructure/database/database-seed.ts` | Run the seed script |
| `db:studio` | `drizzle-kit studio` | Drizzle Studio UI |
| `auth:generate` | `pnpx @better-auth/cli generate --config ./src/features/auth/infrastructure/auth-lib.ts` | Regenerate Better Auth types |

## Why this stack?

- **Next 16 + React 19 + Turbopack**: modern SSR, Server Components, fast dev.
- **Drizzle ORM + PostgreSQL**: SQL-first, fully typed, minimal runtime overhead. Schema-as-TS fits the feature-first layout and keeps ORM state out of a single monolithic file.
- **`postgres` driver**: light, fast, native to JS (no C bindings like `pg`).
- **UUID v7 IDs**: standard UUID format, time-ordered → better B-tree insert patterns than v4 while staying `z.uuid()`-compatible.
- **Better Auth**: lighter and more explicit than NextAuth, first-class TypeScript support, swappable adapter (Drizzle here).
- **React Aria Components**: accessibility baked in, backed by Adobe, used at scale.
- **Biome**: one tool instead of ESLint + Prettier + plugins; dramatically faster.
- **Zod + T3 Env**: runtime validation and typed env variables in a single pipeline.
- **SASS modules**: predictable, scoped, no framework lock-in.
- **Zustand**: minimal client state without Redux overhead.

## What we deliberately do NOT use

- **Prisma** — replaced by Drizzle (smaller runtime, no code-generation step, schemas closer to SQL, per-feature dispatch).
- **Tailwind** — SASS modules provide enough structure and avoid class soup.
- **ESLint / Prettier** — replaced by Biome.
- **Redux / MobX / Jotai** — Zustand is enough.
- **axios** — the native `fetch` API is fine.
- **NextAuth** — Better Auth is preferred for its explicit API and first-class Drizzle adapter.
- **styled-components / emotion** — SASS modules keep styles static and predictable.
- **`pg` driver** — replaced by `postgres` for its lighter footprint and simpler API.
