# Feature guide

How to add or modify a feature in VAP. This doc walks through creating a new feature end to end, following the project's feature-first + clean architecture.

Before reading this, skim `docs/architecture.md` and `docs/conventions.md`.

## When to add a new feature

Create a new feature folder when you introduce a **new business domain**. Examples of what becomes its own feature: `product`, `cart`, `order`, `payment`. Examples of what does **not** deserve its own feature: a helper function, a generic UI component, a new field on an existing model.

If in doubt, start inside the existing feature whose domain your change belongs to, and extract later.

## Feature layout (reminder)

```
features/<name>/
├── domain/
│   ├── <name>-entities.ts       # TS types
│   ├── <name>-schemas.ts        # Zod schemas
│   ├── <name>-constants.ts      # Constants & enums
│   └── <name>-mappers.ts        # DB ↔ domain ↔ DTO (when needed)
├── application/
│   └── <name>-service.ts        # Business logic (use cases)
├── infrastructure/
│   ├── <name>-schema.ts         # Drizzle table definition
│   ├── <name>-repository.ts     # Drizzle access
│   └── <name>-client.ts         # API client (fetch), used by client components
└── presentation/
    ├── controllers/
    │   └── <name>-controller.ts # Server-side controller
    ├── components/              # React components
    └── validation/              # UI-side validation (form resolvers, etc.)
```

Not every feature needs every file from day one. Start with what you need, add layers as complexity grows.

## Walk-through: adding a `review` feature

Say we want to add product reviews: a user can leave one review per product, reviews are listed on the product page, and admins can delete them.

### 1. Create the Drizzle schema

`src/features/review/infrastructure/review-schema.ts`:

```ts
import { integer, pgTable, text, timestamp, uniqueIndex, uuid } from 'drizzle-orm/pg-core'

import { users } from '@/features/auth/infrastructure/auth-schema'
import { products } from '@/features/product/infrastructure/product-schema'
import { createId } from '@/infrastructure/database/identifiers'

export const reviews = pgTable(
  'reviews',
  {
    id: uuid('id').primaryKey().$defaultFn(createId),
    productId: uuid('productId').notNull().references(() => products.id),
    userId: text('userId').notNull().references(() => users.id),
    rating: integer('rating').notNull(),
    comment: text('comment'),
    createdAt: timestamp('createdAt', { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp('updatedAt', { withTimezone: false })
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date())
  },
  table => [uniqueIndex('reviews_product_user_key').on(table.productId, table.userId)]
)
```

Re-export from the barrel at `src/infrastructure/database/schema.ts`:

```ts
export * from '@/features/review/infrastructure/review-schema'
```

Generate and apply the migration:

```bash
pnpm db:generate     # writes src/infrastructure/database/migrations/NNNN_<name>.sql
pnpm db:migrate      # applies it to the DB
```

### 2. Create the domain layer

`src/features/review/domain/review-entities.ts`:

```ts
import type z from 'zod'

import type { CreateReviewSchema, ReviewDTOSchema } from './review-schemas'

export type ReviewDTO = z.infer<typeof ReviewDTOSchema>
export type CreateReviewInput = z.infer<typeof CreateReviewSchema>
```

`src/features/review/domain/review-schemas.ts`:

```ts
import { z } from 'zod'

export const ReviewIdSchema = z.uuid()

export const CreateReviewSchema = z.object({
  productId: z.uuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500).optional()
})

export const ReviewDTOSchema = z.object({
  id: ReviewIdSchema,
  productId: z.uuid(),
  userId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().nullable(),
  createdAt: z.date()
})
```

### 3. Create the repository

`src/features/review/infrastructure/review-repository.ts`:

```ts
import 'server-only'

import { eq } from 'drizzle-orm'

import type {
  CreateReviewInput,
  ReviewDTO
} from '@/features/review/domain/review-entities'
import { reviews } from '@/features/review/infrastructure/review-schema'
import { failure, type Result, success } from '@/helpers/result'
import { db } from '@/infrastructure/database'
import { getDatabaseError } from '@/infrastructure/database/database-helpers'

const reviewSelectedFields = {
  id: reviews.id,
  productId: reviews.productId,
  userId: reviews.userId,
  rating: reviews.rating,
  comment: reviews.comment,
  createdAt: reviews.createdAt
} as const

const findByProduct = async (productId: string): Promise<Result<ReviewDTO[]>> => {
  try {
    const rows = await db
      .select(reviewSelectedFields)
      .from(reviews)
      .where(eq(reviews.productId, productId))

    return success(rows)
  } catch (error) {
    console.error('Unknown error in ReviewRepository.findByProduct:', error)
    return failure()
  }
}

const create = async (
  userId: string,
  input: CreateReviewInput
): Promise<Result<ReviewDTO, 'DUPLICATE'>> => {
  try {
    const [inserted] = await db
      .insert(reviews)
      .values({
        productId: input.productId,
        userId,
        rating: input.rating,
        comment: input.comment
      })
      .returning(reviewSelectedFields)

    if (!inserted) return failure()

    return success(inserted)
  } catch (error) {
    const dbError = getDatabaseError(error)

    if (dbError.code === 'DUPLICATE') {
      return failure('DUPLICATE')
    }

    console.error('Unknown error in ReviewRepository.create:', error)
    return failure()
  }
}

export const ReviewRepository = { findByProduct, create }
```

### 4. Create the service (business logic)

`src/features/review/application/review-service.ts`:

```ts
import 'server-only'

import type {
  CreateReviewInput,
  ReviewDTO
} from '@/features/review/domain/review-entities'
import { ReviewRepository } from '@/features/review/infrastructure/review-repository'
import { failure, type Result, success } from '@/helpers/result'

type CreateReviewError = 'DUPLICATE'

const listByProduct = async (productId: string): Promise<Result<ReviewDTO[]>> =>
  ReviewRepository.findByProduct(productId)

const create = async (
  userId: string,
  input: CreateReviewInput
): Promise<Result<ReviewDTO, CreateReviewError>> =>
  ReviewRepository.create(userId, input)

export const ReviewService = { create, listByProduct }
```

### 5. Create the controller (server-side)

`src/features/review/presentation/controllers/review-controller.ts`:

```ts
import 'server-only'

import type {
  CreateReviewInput,
  ReviewDTO
} from '@/features/review/domain/review-entities'
import { ReviewService } from '@/features/review/application/review-service'
import { HttpResponse } from '@/infrastructure/api/http-response'

const findByProduct = async (productId: string) => {
  const result = await ReviewService.listByProduct(productId)
  if (result.status === 'ERROR') return HttpResponse.internal()
  return HttpResponse.ok<ReviewDTO[]>(result.data)
}

const create = async (userId: string, input: CreateReviewInput) => {
  const result = await ReviewService.create(userId, input)

  if (result.status === 'ERROR') {
    if (result.error === 'DUPLICATE') return HttpResponse.conflict('DUPLICATE')
    return HttpResponse.internal()
  }

  return HttpResponse.created<ReviewDTO>(result.data)
}

export const ReviewController = { create, findByProduct }
```

### 6. Create the API client (for client components)

`src/features/review/infrastructure/review-client.ts`:

```ts
import type { CreateReviewInput, ReviewDTO } from '@/features/review/domain/review-entities'
import { apiFetch } from '@/infrastructure/api/api-fetch'

const findByProduct = async (productId: string) =>
  apiFetch<ReviewDTO[]>(`/api/products/${productId}/reviews`)

const create = async (input: CreateReviewInput) =>
  apiFetch<ReviewDTO>('/api/reviews', {
    method: 'POST',
    body: JSON.stringify(input)
  })

export const ReviewClient = { create, findByProduct }
```

### 7. Create the API route

`src/app/api/reviews/route.ts`:

```ts
import { auth } from '@/features/auth/infrastructure/auth-lib'
import { CreateReviewSchema } from '@/features/review/domain/review-schemas'
import { ReviewController } from '@/features/review/presentation/controllers/review-controller'
import { HttpResponse } from '@/infrastructure/api/http-response'

export const POST = async (request: Request) => {
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session) return HttpResponse.unauthorized()

  const body = await request.json()
  const parsed = CreateReviewSchema.safeParse(body)
  if (!parsed.success) return HttpResponse.badRequest(parsed.error.issues)

  return ReviewController.create(session.user.id, parsed.data)
}
```

### 8. Use it in the UI

Server component (product page):

```tsx
import { ReviewController } from '@/features/review/presentation/controllers/review-controller'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const response = await ReviewController.findByProduct(params.id)
  if (response.status !== 200) return <p>Failed to load reviews</p>
  return <ReviewList reviews={response.data} />
}
```

Client component (review form):

```tsx
'use client'

import { ReviewClient } from '@/features/review/infrastructure/review-client'

export const NewReviewForm = ({ productId }: { productId: string }) => {
  const handleSubmit = async (rating: number, comment: string) => {
    const res = await ReviewClient.create({ productId, rating, comment })
    if (res.status !== 201) {
      // show a toast, handle res.error
    }
  }
  // ...
}
```

## Checklist when adding a feature

- [ ] Drizzle schema added in `features/<name>/infrastructure/<name>-schema.ts`.
- [ ] Barrel updated (`src/infrastructure/database/schema.ts`).
- [ ] Migration generated (`pnpm db:generate`) and applied (`pnpm db:migrate`).
- [ ] `domain/` files: entities, schemas, constants (only what you need).
- [ ] `application/<name>-service.ts` with `Result` return types.
- [ ] `infrastructure/<name>-repository.ts` with `server-only` at the top.
- [ ] `infrastructure/<name>-client.ts` for client components if needed.
- [ ] `presentation/controllers/<name>-controller.ts` mapping `Result` → HTTP.
- [ ] API route(s) in `src/app/api/...` validating input with Zod.
- [ ] UI components under `presentation/components/`.
- [ ] French copy added to `src/infrastructure/i18n/dictionaries/fr.ts` (if user-visible).
- [ ] `pnpm lint` passes.
- [ ] `pnpm build` passes (catches type errors dev mode hides).

## Modifying an existing feature

Most of the time you will:

1. Read the existing `*-service.ts` to understand current behaviour.
2. Adjust `*-entities.ts` / `*-schemas.ts` if the shape changes.
3. If DB columns change, edit `*-schema.ts` and run `pnpm db:generate` → `pnpm db:migrate`.
4. Update the service with the new use case (Result return preserved).
5. Update the controller + API route if you are exposing a new endpoint.
6. Update the UI components.
7. Run `pnpm lint` and `pnpm build`.

Resist the urge to refactor the whole feature while you are there. Ship the change, open a dedicated PR for cleanups.
