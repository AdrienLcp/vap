---
description: Layer ordering, the Result pattern, server vs client components, file naming, where an external library may be imported
paths:
  - src/**
---

# Code architecture

## Layers only depend downward

```
presentation → application → infrastructure → domain (types)
```

- `domain/` imports nothing from `application/`, `infrastructure/` or
  `presentation/`.
- `application/` may import `domain/` and `infrastructure/`.
- `infrastructure/` may import `domain/`. **Never** `application/` or
  `presentation/`.
- `presentation/` may import anything.

An import that breaks this order is a design problem, not an import problem —
rethink the placement instead of reaching for the path.

## Result pattern — no business exceptions

```ts
import { success, failure, type Result } from '@/helpers/result'

type FindProductError = 'NOT_FOUND' | 'DATABASE_ERROR'

export const findProduct = async (id: string): Promise<Result<Product, FindProductError>> => {
  const product = await productRepository.findById(id)
  if (!product) return failure('NOT_FOUND')
  return success(product)
}
```

At the call site, the narrowing is what types the payload:

```ts
const result = await findProduct(id)
if (result.status === 'ERROR') {
  // result.error is typed
  return
}
// result.data is typed
```

`throw` is acceptable only at a technical boundary — an unexpected infra error
Next will catch. `try/catch` never drives business logic.

## Server components call controllers, client components call API clients

A file without `'use client'` awaits the controller **directly**, with no HTTP
round trip:

```tsx
const response = await ProductController.findProducts()
if (response.status !== 200) return <ErrorState />
```

A `'use client'` file calls the API client, which fetches `/api/…`:

```tsx
ProductClient.findProducts().then(res => { … })
```

**Never import a controller or a repository from a client component** — those
are server-only modules, and the failure is a build error at best.

## File naming says what a file is

| Suffix | What it holds | Layer |
|---|---|---|
| `*-entities.ts` | business types, DTOs | domain |
| `*-schemas.ts` | Zod schemas | domain |
| `*-constants.ts` | constants and enums | domain |
| `*-mappers.ts` | DB ↔ domain ↔ DTO conversions | domain |
| `*-service.ts` | business logic | application |
| `*-repository.ts` | Drizzle access | infrastructure |
| `*-schema.ts` | Drizzle table definition | infrastructure |
| `*-client.ts` | API client for client components | infrastructure |
| `*-lib.ts` | wrapper around an external lib | infrastructure |
| `*-controller.ts` | server-side controller | presentation |

## Zod validates at the boundary, and only there

Every API route validates its body and query with a Zod schema before calling a
service. Services receive typed data, never `unknown`. The schemas live in
`features/<x>/domain/<x>-schemas.ts`.

## Imports

Always `@/*` for anything internal — never `../../../`. Biome sorts them:
directives (`'server-only'`, `'use client'`) first, then packages, then `@/`,
then relatives. Do not hand-order them.

## Abstraction boundaries — the repository IS the boundary

External libraries (`drizzle-orm`, `stripe`, `resend`, `better-auth`,
`@react-email/*`…) may only be imported from `infrastructure/` — repositories,
`*-lib.ts` wrappers, `*-sender.ts` adapters, `*-client.ts`, `*-storage.ts`. Such
an import in `application/`, `domain/` or `presentation/` is a design bug; fix
it by moving the call behind an existing port, or by introducing the missing
one.

And do **not** stack a generic wrapper underneath an adapter — `database.create()`,
a unified "email client", a neutral "payment SDK". The Prisma → Drizzle
migration is this repo's own proof that the rewrite happens at the adapter and
nothing thinner underneath would have reduced it.

| Anti-pattern | Correct port |
|---|---|
| `database.create(table, row)` | `productRepository.create(product)` |
| `emailClient.send(options)` | `welcomeEmailService.send(user)` |
| `paymentSdk.charge(params)` | `paymentGateway.chargeOrder(order)` |
| `httpClient.request(cfg)` | `ProductClient.findProducts(query)` |

Full rationale: [`docs/abstraction-boundaries.md`](../../docs/abstraction-boundaries.md).

## What not to do

- No `README.md` in every folder
- No ESLint or Prettier — Biome does both
- No Tailwind, no other CSS framework
- No second state-management library — Zustand is already here
- No `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error` without an inline
  comment justifying it
- No function longer than 100 lines — Biome blocks it
- No `console.log` — `console.info` / `warn` / `error` only
- No `fetch` from a server component — call the controller
- No French in a committed file, outside the i18n French dictionary
