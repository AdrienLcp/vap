# VAP Documentation

E-commerce platform built with Next.js 16 + React 19 + strict TypeScript, following a feature-first / clean architecture approach.

## Index

### Getting started

- **[getting-started.md](./getting-started.md)** — Full onboarding for a new developer: prerequisites, DB setup, env variables, first `pnpm dev`.

### Understanding the project

- **[stack.md](./stack.md)** — Detailed tech stack with versions and rationale.
- **[architecture.md](./architecture.md)** — Feature-first + clean architecture, layers, data flow, Server vs Client components.
- **[database.md](./database.md)** — Prisma schema, models, relations, enums.
- **[authentication.md](./authentication.md)** — Better Auth, Google OAuth, roles, sessions.

### Writing code in the project

- **[conventions.md](./conventions.md)** — Biome, strict TypeScript, Result pattern, imports, naming.
- **[feature-guide.md](./feature-guide.md)** — How to add or modify a feature (concrete walk-through).

## Recommended reading order by profile

**Just cloned the repo** → `getting-started.md`, then `architecture.md`.

**Modifying an existing feature** → `conventions.md`, then `feature-guide.md`.

**Creating a new feature** → `feature-guide.md`, using an existing feature as a template (`product` is the most complete).

**Working on the DB** → `database.md`, then the schema at `src/infrastructure/database/schema.prisma`.

**Working on authentication** → `authentication.md`, then `src/features/auth/infrastructure/auth-lib.ts`.

## Files worth knowing

- `CLAUDE.md` (root) — short instructions for AI assistants.
- `.claude/rules.md` — detailed project rules.
- `README.md` (root) — project showcase with badges, features, architecture.
- `biome.json` — lint/format config.
- `tsconfig.json` — TypeScript config (strict, `@/*` path alias).
- `prisma.config.ts` — Prisma config (schema, migrations, seed).
- `src/infrastructure/database/schema.prisma` — database schema.

## Language rule

All files committed to this repository — including documentation, comments and code — must be written in English. The only exception is the French i18n dictionary at `src/infrastructure/i18n/dictionaries/fr.ts`, which holds user-facing copy.
