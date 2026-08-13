# VAP Documentation

E-commerce platform built with Next.js 16 + React 19 + strict TypeScript, following a feature-first / clean architecture approach.

## Index

### Getting started

- **[getting-started.md](./getting-started.md)** — Full onboarding for a new developer: prerequisites, DB setup, env variables, first `pnpm dev`.

### Understanding the project

- **[stack.md](./stack.md)** — Detailed tech stack with versions and rationale.
- **[architecture.md](./architecture.md)** — Feature-first + clean architecture, layers, data flow, Server vs Client components.
- **[database.md](./database.md)** — Drizzle schemas (per feature), tables, relations, enums, migrations.
- **[authentication.md](./authentication.md)** — Better Auth, Google OAuth, roles, sessions.

### Writing code in the project

- **[conventions.md](./conventions.md)** — Biome, strict TypeScript, Result pattern, imports, naming.
- **[feature-guide.md](./feature-guide.md)** — How to add or modify a feature (concrete walk-through).

## Recommended reading order by profile

**Just cloned the repo** → `getting-started.md`, then `architecture.md`.

**Modifying an existing feature** → `conventions.md`, then `feature-guide.md`.

**Creating a new feature** → `feature-guide.md`, using an existing feature as a template (`product` is the most complete).

**Working on the DB** → `database.md`, then the per-feature Drizzle schemas (`src/features/<name>/infrastructure/<name>-schema.ts`) and the barrel at `src/infrastructure/database/schema.ts`.

**Working on authentication** → `authentication.md`, then `src/features/auth/infrastructure/auth-lib.ts`.

## Files worth knowing

- `.claude/CLAUDE.md` — short instructions for AI assistants, loaded on every session.
- `.claude/rules/*.md` — detailed rules, each scoped to the files it applies to.
- `README.md` (root) — project showcase with badges, features, architecture.
- `biome.json` — lint/format config.
- `tsconfig.json` — TypeScript config (strict, `@/*` path alias).
- `drizzle.config.ts` — Drizzle Kit config (schema barrel, migrations folder).
- `docker-compose.yml` — Postgres container used by `pnpm dev`.
- `src/infrastructure/database/schema.ts` — barrel re-exporting every feature's Drizzle schema.

## Language rule

All files committed to this repository — including documentation, comments and code — must be written in English. The only exception is the French i18n dictionary at `src/infrastructure/i18n/dictionaries/fr.ts`, which holds user-facing copy.
