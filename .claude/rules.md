# VAP rules

Detailed rules for any AI assistant working on this project. Complements `CLAUDE.md` at the repo root.

## 0. Language

**All code, docs, comments and files committed to the repo must be in English.** Only exception: the French i18n dictionary at `src/infrastructure/i18n/dictionaries/fr.ts` (user-facing copy).

## 1. Architecture — layer ordering

Data flow strictly follows this direction (no layer ever depends upward):

```
presentation → application → infrastructure → domain (types)
```

- `domain/`: imports nothing from `application/`, `infrastructure/`, or `presentation/`.
- `application/`: may import `domain/` and `infrastructure/`.
- `infrastructure/`: may import `domain/`. NEVER `application/` or `presentation/`.
- `presentation/`: may import everything.

If you add an import that breaks this order, rethink the design.

## 2. Result pattern — no business exceptions

```ts
import { success, failure, type Result } from '@/helpers/result'

type FindProductError = 'NOT_FOUND' | 'DATABASE_ERROR'

export const findProduct = async (id: string): Promise<Result<Product, FindProductError>> => {
  const product = await productRepository.findById(id)
  if (!product) return failure('NOT_FOUND')
  return success(product)
}
```

At the call site:

```ts
const result = await findProduct(id)
if (result.status === 'ERROR') {
  // result.error is typed
  return
}
// result.data is typed
```

- `throw` is only acceptable at technical boundaries (unexpected infra errors that Next will catch).
- Never use `try/catch` to drive business logic — use Result instead.

## 3. Server vs Client components

### Server Component (file without `'use client'`)

```tsx
import { ProductController } from '@/features/product/presentation/controllers/product-controller'

export const ProductListPage = async () => {
  const response = await ProductController.findProducts()
  if (response.status !== 200) return <ErrorState />
  return <ProductGrid products={response.data} />
}
```

→ **direct** call to the controller, no HTTP fetch.

### Client Component (`'use client'`)

```tsx
'use client'

import { ProductClient } from '@/features/product/infrastructure/product-client'

export const ProductListClient = () => {
  const [products, setProducts] = useState<ProductDTO[]>([])
  useEffect(() => {
    ProductClient.findProducts().then(res => {
      if (res.status === 200) setProducts(res.data)
    })
  }, [])
  return <ProductGrid products={products} />
}
```

→ calls the API client which fetches `/api/...`.

**Never import a controller or a repository from a client component.** Those are server-only modules.

## 4. File naming conventions

- `*-entities.ts`: business types (interfaces, DTOs)
- `*-schemas.ts`: Zod schemas
- `*-constants.ts`: constants and enums
- `*-mappers.ts`: DB ↔ domain ↔ DTO conversions
- `*-service.ts`: business logic (application layer)
- `*-repository.ts`: Drizzle DB access (infrastructure)
- `*-schema.ts`: Drizzle table definition (infrastructure)
- `*-client.ts`: API client used from client components (infrastructure)
- `*-controller.ts`: server-side controller (presentation)
- `*-lib.ts`: wrapper around an external lib (Stripe, Better Auth…)

## 5. Zod validation — at the boundary only

- Every API route validates body/query with a Zod schema before calling a service.
- Services receive already-typed data, not `unknown`.
- Zod schemas live in `features/<x>/domain/<x>-schemas.ts`.

## 6. Import alias and ordering

Always use `@/*` for internal imports. Never use `../../../`.

Order enforced by Biome (auto-sorted):

```ts
import 'server-only'                     // directives first

import React from 'react'                  // packages
import { NextRequest } from 'next/server'

import { productService } from '@/features/product/application/product-service'
import { success } from '@/helpers/result'

import { localHelper } from './helper'    // relatives last
```

## 7. Styling — SASS modules only

- Each component ships with a `Component.module.sass` next to it.
- No Tailwind, no styled-components, no CSS-in-JS.
- Conditional classes via `classnames`.
- Global styles in `src/presentation/styles/`.

## 8. Accessibility — non-negotiable

- Every interactive element uses React Aria (`Button`, `ListBox`, `GridList`, `Form`…).
- Never use `<div onClick>`.
- Explicit labels on every field, decorative icons with `aria-hidden`.
- Keyboard navigation tested (Tab, Enter, Space, arrows).
- Minimum AA contrast.

## 9. i18n

- `t()` from `@/infrastructure/i18n` is **client-only**.
- Current dictionary: `src/infrastructure/i18n/dictionaries/fr.ts`.
- Hardcoded strings are only tolerated in server components; otherwise, go through the dictionary.
- The French dictionary file is the only place French text is allowed inside the repo.

## 10. Database

- Schemas are per-feature: `src/features/<name>/infrastructure/<name>-schema.ts`, re-exported from `src/infrastructure/database/schema.ts` (barrel).
- To change the schema: edit the feature's `*-schema.ts`, then `pnpm db:generate` (writes SQL) and `pnpm db:migrate` (applies). `pnpm dev` also runs `db:migrate`.
- Never edit a migration SQL file that has been committed and applied to shared environments — create a new migration.
- Destructive migrations (drop column, rename): warn the user before running.
- Seed script: `src/infrastructure/database/database-seed.ts`. Migrate runner: `src/infrastructure/database/database-migrate.ts`.
- Business tables use native `uuid` columns + `createId()` (UUID v7). Auth tables (`users`, `sessions`, `accounts`, `verifications`) use `text` because Better Auth generates nanoid-style IDs.
- Prefer `pnpm db:migrate` over `drizzle-kit migrate` — the CLI spinner hangs on Git Bash.

## 11. Authentication

- Better Auth configuration: `src/features/auth/infrastructure/auth-lib.ts`.
- After any auth config change: `pnpm auth:generate`.
- Roles: `USER`, `ADMIN`, `SUPER_ADMIN`. Check the role server-side, not in the client.

## 12. Stripe (stripe branch)

- SDK instantiated in `src/features/payment/infrastructure/payment-lib.ts`.
- API key: `STRIPE_API_KEY` in `.env`.
- Always use the **test** key in dev. Never commit a live key.
- Stripe webhooks: validate the signature before any processing.

## 13. Commits

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.
- Commit messages in English.
- Before every commit: `pnpm lint` must pass.

## 14. What NOT to do

- Do not create new `README.md` files inside every folder.
- Do not add ESLint/Prettier (Biome handles both).
- Do not introduce Tailwind or any other CSS framework.
- Do not install an additional state management lib (Zustand is already here).
- Do not use `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error` without an inline comment justifying it.
- Do not write functions longer than 100 lines (Biome will block it).
- Do not log with `console.log` (use `console.info`/`warn`/`error`).
- Do not fetch from a server component — call the controller directly.
- Do not write any French text in committed files, except in the i18n French dictionary.
