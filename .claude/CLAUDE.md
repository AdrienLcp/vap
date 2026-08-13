# VAP

E-commerce platform on Next.js 16 (App Router, Turbopack) + React 19 + strict
TypeScript, feature-first and layered. Drizzle ORM over PostgreSQL 16, Better
Auth, Stripe, React Aria Components, SASS modules, Biome. Versions and the
reasoning behind each choice: [`docs/stack.md`](../docs/stack.md).

**Everything committed is English.** The single exception is the French i18n
dictionary at `src/infrastructure/i18n/dictionaries/fr.ts`, which is user-facing
copy.

## Commands

```bash
pnpm dev            # Postgres (Docker) up + migrations + dev server
pnpm build          # production build
pnpm lint           # Biome, lint + format — must pass before every commit
pnpm db:generate    # write a new Drizzle migration from the TS schema
pnpm db:migrate     # apply pending migrations
pnpm db:seed        # seed the database
pnpm db:studio      # Drizzle Studio
pnpm auth:generate  # regenerate Better Auth types
```

**`pnpm` (10.27.0) is mandatory** — never `npm`, never `yarn`. Postgres runs in
Docker (`docker-compose.yml`); `pnpm dev` boots the container, waits for it to
be healthy, migrates, then starts Next.

## Structure

```
src/
├── app/               Next.js App Router — pages, layouts, API routes
├── features/<name>/   one folder per business domain
│   ├── domain/          entities, Zod schemas, constants, mappers
│   ├── application/     services, React hooks
│   ├── infrastructure/  Drizzle schema + repository, API clients, lib wrappers
│   └── presentation/    UI components, server-side controllers
├── infrastructure/    shared technical services — db, auth, env, i18n
├── domain/            shared business entities
├── presentation/      shared global UI
├── helpers/           the Result pattern
└── utils/             generic helpers
```

Features: `address`, `admin`, `auth`, `cart`, `category`, `email`, `home`,
`order`, `payment`, `product`, `user`.

## Absolute rules

1. **Result pattern, no exceptions.** `success(data)` / `failure(error)` from
   `@/helpers/result`. Business logic never `throw`s.
2. **Strict TypeScript, zero `any`, zero casts.** If the type does not pass, fix
   the type.
3. **A server component calls a controller directly; a client component calls an
   API client.** Never import a controller or a repository from `'use client'`.
4. **`t()` is client-only.**
5. **React Aria for anything interactive** — no `<div onClick>`, keyboard paths
   work, AA contrast.
6. **Zod at every external boundary** — API body, query params, form data.
7. **External libraries are imported from `infrastructure/` only.**
8. **Never edit an applied migration**; write a new one, and announce a
   destructive one before running it.
9. **`@/*` for every internal import** — never `../../../`.
10. **`pnpm lint` passes before every commit.** Biome owns semicolons, quotes,
    indentation, trailing commas and import order — do not hand-format, and do
    not add ESLint or Prettier.

The reasoning behind 1, 3, 7 and 9 loads on its own from `.claude/rules/` when a
source file is opened.

## Read before

- [`docs/feature-guide.md`](../docs/feature-guide.md) — **before creating or
  reshaping a feature.** `product` is the most complete template.
- [`docs/architecture.md`](../docs/architecture.md) — **before moving anything
  across a layer.** Data flow, clean-architecture boundaries.
- [`docs/abstraction-boundaries.md`](../docs/abstraction-boundaries.md) —
  **before adding a wrapper, a client or a "service" over a library.**
- [`docs/database.md`](../docs/database.md) — **before a schema change.** Tables,
  relations, enums, the two kinds of primary key.
- [`docs/authentication.md`](../docs/authentication.md) — Better Auth, OAuth,
  roles. [`docs/stripe-checkout.md`](../docs/stripe-checkout.md) — the checkout
  flow.
- [`docs/getting-started.md`](../docs/getting-started.md) — onboarding, and the
  `.env` walkthrough.

## When you learn something about this project

Write it where it will be read: triggered by a **file** → `.claude/rules/*.md`
with a `paths:` frontmatter; triggered by a **moment** → a doc, named by a
pointer above; a hard constraint that must never be forgotten → one line in this
file, reasoning elsewhere.
