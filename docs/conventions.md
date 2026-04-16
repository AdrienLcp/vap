# Code conventions

All conventions are enforced by Biome (`biome.json`) or strict TypeScript (`tsconfig.json`). Running `pnpm lint` must pass before every commit.

## Language

All code and docs in this repo are written in **English**. The only exception is the French user-facing copy in `src/infrastructure/i18n/dictionaries/fr.ts`.

## Biome — formatter

| Rule | Value |
|---|---|
| Indentation | 2 spaces |
| Quotes (JS) | single |
| Quotes (JSX) | single |
| Semicolons | as needed (in practice: almost never) |
| Trailing commas | none |
| Arrow param parentheses | omitted when a single param |

Run `pnpm format` to apply. Most mistakes are auto-fixed.

## Biome — linter (project-specific rules)

- **`suspicious/noConsole`**: `console.log` is forbidden. Allowed: `console.error`, `console.warn`, `console.info`.
- **`complexity/noExcessiveLinesPerFunction`**: max **100 lines** per function (blank lines ignored). Split larger functions.
- **`next: all`** and **`react: all`** domains are enabled — every Next.js and React best-practice rule is active.

## Biome — import sorting

Imports are automatically grouped and sorted into blocks, separated by blank lines:

```ts
// 1. Directives
import 'server-only'
// (and 'use client' / 'use server' at the very top of a file if present)

// 2. URL imports (rare)
// (none)

// 3. Node built-ins / Bun
import path from 'node:path'

// 4. Package imports (npm, jsr, etc.)
import { NextResponse } from 'next/server'
import { z } from 'zod'

// 5. @Lib/** (reserved slot, currently unused)

// 6. Alias imports (@/*)
import { productService } from '@/features/product/application/product-service'
import { success, failure } from '@/helpers/result'

// 7. Relative imports
import { helper } from './helper'
```

Biome does this for you on save / on `pnpm format`.

## TypeScript

- `strict: true`
- No `any`. No `as unknown as`. No `@ts-ignore` or `@ts-expect-error` without a comment explaining why.
- No casts (`as Foo`) unless it is the only way to interop with a library that returns `unknown`, and then leave a comment.
- Prefer `type` over `interface` unless you need declaration merging.
- Prefer `const` assertions and union types over enums for non-database types. (Database-side, Drizzle `pgEnum` definitions are the source of truth.)

## Result pattern

Business logic never throws. Return a `Result<Data, Error>`:

```ts
import { success, failure, type Result } from '@/helpers/result'

type DeleteProductError = 'NOT_FOUND' | 'UNAUTHORIZED'

export const deleteProduct = async (
  id: string,
  userRole: Role
): Promise<Result<void, DeleteProductError>> => {
  if (userRole !== 'ADMIN' && userRole !== 'SUPER_ADMIN') {
    return failure('UNAUTHORIZED')
  }
  const deleted = await productRepository.delete(id)
  if (!deleted) return failure('NOT_FOUND')
  return success()
}
```

At the call site:

```ts
const result = await deleteProduct(id, user.role)

if (result.status === 'ERROR') {
  // result.error: 'NOT_FOUND' | 'UNAUTHORIZED' | 'UNEXPECTED_ERROR'
  return
}

// result is a SuccessResult — TS knows it
```

`try/catch` is reserved for actually unexpected infrastructure failures (network drop, corrupted payload). Business errors are not exceptions.

## File naming

| Suffix | Layer | Content |
|---|---|---|
| `*-entities.ts` | domain | TS types (interfaces, DTOs) |
| `*-schemas.ts` | domain | Zod schemas |
| `*-constants.ts` | domain | Constants, enums |
| `*-mappers.ts` | domain | DB ↔ domain ↔ DTO conversions |
| `*-service.ts` | application | Business logic (use cases) |
| `*-repository.ts` | infrastructure | Drizzle DB access |
| `*-schema.ts` | infrastructure | Drizzle table definition |
| `*-client.ts` | infrastructure | API client (fetch) |
| `*-controller.ts` | presentation | Server-side controller |
| `*-lib.ts` | infrastructure | External lib wrapper |

Files are kebab-case. Components stay in PascalCase (`ProductCard.tsx`).

## Path alias

Always use `@/*` (mapped to `./src/*`).

```ts
// ✅
import { Button } from '@/presentation/components/ui/Button'

// ❌
import { Button } from '../../../presentation/components/ui/Button'
```

## Zod validation at the boundary

- API routes, server actions, and form handlers validate incoming data with a Zod schema **before** calling a service.
- Services receive already-typed data, never `unknown`.
- Schemas live in `features/<x>/domain/<x>-schemas.ts`.

```ts
export const addCartItemSchema = z.object({
  productId: z.uuid(),
  quantity: z.number().int().positive()
})

export type AddCartItemInput = z.infer<typeof addCartItemSchema>
```

## Styling

- **SASS modules only**. Each component ships with `Component.module.sass`.
- Conditional classes via `classnames`.
- No inline styles except for dynamic values that cannot be expressed in CSS (e.g. computed progress bars).
- No Tailwind, no styled-components.

## Accessibility

- Every interactive element uses a React Aria primitive. Never `<div onClick>`.
- Decorative icons get `aria-hidden`. Meaningful icons get an accessible label.
- All form fields are labelled explicitly.
- Every new component is tested with the keyboard (Tab, Enter, Space, arrows).
- Color contrast at least AA.

## i18n

- User-visible strings live in `src/infrastructure/i18n/dictionaries/fr.ts`.
- Call `t('key')` from **client components only**. Server components use hardcoded English placeholders until the i18n context is in place.
- Never put French text anywhere outside the French dictionary.

## Commits

- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `chore:`.
- Commit messages in English.
- Keep commits scoped to one logical change.
- Always run `pnpm lint` before committing.

## Quick checklist before opening a PR

- [ ] `pnpm lint` passes
- [ ] `pnpm build` succeeds locally (catches type errors that dev mode hides)
- [ ] New services return `Result`
- [ ] API routes validate input with Zod
- [ ] New UI is keyboard-accessible
- [ ] No `console.log`, no `any`, no `@ts-ignore`
- [ ] French text only in `dictionaries/fr.ts`
- [ ] Schema changes have a matching migration file under `src/infrastructure/database/migrations/`
