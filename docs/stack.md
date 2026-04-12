# Tech Stack

All versions are pinned in `package.json`. This doc describes what each dependency does and why it was picked.

## Runtime & language

| Tool | Version | Role |
|---|---|---|
| **Node.js** | ≥ 18.17.0 | JS runtime |
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
| **prisma** | 7.3.0 | ORM, migration tool, Prisma Studio |
| **@prisma/client** | 7.3.0 | Generated type-safe client |
| **@prisma/adapter-pg** | ^7.3.0 | Prisma adapter for `pg` (serverless-friendly) |
| **@prisma/client-runtime-utils** | ^7.3.0 | Prisma runtime helpers |
| **pg** | ^8.18.0 | PostgreSQL driver |

Schema lives at `src/infrastructure/database/schema.prisma`. The generated client goes to `src/infrastructure/database/generated/` (ignored by Biome and **must never be edited manually**).

Configuration: `prisma.config.ts` points Prisma at the schema, migrations folder, and seed script.

## Authentication

| Package | Version | Role |
|---|---|---|
| **better-auth** | ^1.4.18 | Modern auth library (sessions, OAuth, email/password) |
| **js-sha256** | ^0.11.1 | Cryptographic hashing |

Better Auth is set up in `src/features/auth/infrastructure/auth-lib.ts`, with:

- Email + password login
- Google OAuth
- User deletion & email change enabled
- An additive `role` field (`USER` / `ADMIN` / `SUPER_ADMIN`)
- A Prisma adapter backed by PostgreSQL

After any auth config change, run `pnpm auth:generate` to regenerate types.

## Payment

| Package | Version | Role |
|---|---|---|
| **stripe** | ^20.3.1 | Stripe server SDK |

Instantiated in `src/features/payment/infrastructure/payment-lib.ts`. Integration is currently in progress on the `stripe` branch. The `payment` feature already holds its domain entities, schemas, mappers, service, repository and client.

## UI & accessibility

| Package | Version | Role |
|---|---|---|
| **react-aria-components** | ^1.15.1 | Adobe-backed accessible UI primitives (WCAG 2.1 AA) |
| **lucide-react** | ^0.563.0 | Icon set |
| **classnames** | ^2.5.1 | Conditional class composition |
| **sass** | ^1.97.3 | SASS modules for styling |

No Tailwind, no styled-components, no CSS-in-JS. Every component ships with a `Component.module.sass` file next to it.

## State & data fetching

| Package | Version | Role |
|---|---|---|
| **zustand** | ^5.0.11 | Client-side state (cart, UI state) |
| **nuqs** | ^2.8.8 | Type-safe state in the URL query string |

Server data lives in server components; client components use Zustand for UI state and call API clients for data.

## Validation

| Package | Version | Role |
|---|---|---|
| **zod** | ^4.3.6 | Runtime schemas and validation |
| **@t3-oss/env-nextjs** | ^0.13.10 | Validate environment variables at boot |
| **dotenv** | ^17.2.4 | Load `.env` during scripts (seed, Prisma) |

Every external input (API route body, query params, form data) is validated with a Zod schema before reaching a service.

## Dev tooling

| Package | Version | Role |
|---|---|---|
| **@biomejs/biome** | 2.3.14 | Unified linter + formatter + import sorter |
| **tsx** | ^4.21.0 | Run TS files directly (used by the seed) |
| **@types/node** | ^25.2.1 | Node type definitions |
| **@types/pg** | ^8.16.0 | `pg` type definitions |
| **@types/react** | 19.2.13 | React type definitions |
| **@types/react-dom** | 19.2.3 | React DOM type definitions |

No ESLint, no Prettier. Biome handles lint + format + import sorting in a single fast pass. Config in `biome.json`.

## Build & dev scripts (package.json)

| Script | Command | Purpose |
|---|---|---|
| `dev` | `next dev --turbopack` | Dev server with Turbopack |
| `build` | `next build` | Production build |
| `start` | `next start` | Serve the production build |
| `lint` | `biome check` | Lint + format check |
| `format` | `biome format --write` | Apply formatting |
| `db:migrate` | `prisma migrate dev` | Create & apply a migration |
| `db:generate` | `prisma generate` | Regenerate the Prisma client |
| `db:seed` | `prisma db seed` | Run the seed script |
| `db:studio` | `prisma studio` | Prisma Studio UI |
| `auth:generate` | `pnpx @better-auth/cli generate --config ./src/features/auth/infrastructure/auth-lib.ts` | Regenerate Better Auth types |
| `deps:upgrade` | `pnpm -r up -L` | Upgrade every dependency to latest (handle with care) |
| `postinstall` | `prisma generate` | Auto-generate Prisma client after install |

## Why this stack?

- **Next 16 + React 19 + Turbopack**: modern SSR, Server Components, fast dev.
- **Prisma + PostgreSQL**: type-safe ORM, excellent migration workflow, mature ecosystem.
- **Better Auth**: lighter and more explicit than NextAuth, first-class TypeScript support.
- **React Aria Components**: accessibility baked in, backed by Adobe, used at scale.
- **Biome**: one tool instead of ESLint + Prettier + plugins; dramatically faster.
- **Zod + T3 Env**: runtime validation and typed env variables in a single pipeline.
- **SASS modules**: predictable, scoped, no framework lock-in.
- **Zustand**: minimal client state without Redux overhead.

## What we deliberately do NOT use

- **Tailwind** — SASS modules provide enough structure and avoid class soup.
- **ESLint / Prettier** — replaced by Biome.
- **Redux / MobX / Jotai** — Zustand is enough.
- **axios** — the native `fetch` API is fine.
- **NextAuth** — Better Auth is preferred for its explicit API and Prisma integration.
- **styled-components / emotion** — SASS modules keep styles static and predictable.
