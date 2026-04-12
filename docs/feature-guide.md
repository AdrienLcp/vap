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
│   └── <name>-mappers.ts        # DB ↔ domain ↔ DTO
├── application/
│   └── <name>-service.ts        # Business logic (use cases)
├── infrastructure/
│   ├── <name>-repository.ts     # Prisma access
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

### 1. Update the database schema

Edit `src/infrastructure/database/schema.prisma`:

```prisma
model Review {
  id        String   @id @default(cuid())
  productId String
  product   Product  @relation(fields: [productId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  rating    Int      // 1–5
  comment   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt

  @@unique([productId, userId])
  @@map("reviews")
}
```

Add the opposite side of the relation to `User` and `Product` (`reviews Review[]`).

Then:

```bash
pnpm db:migrate --name add_reviews
pnpm db:generate
```

### 2. Create the domain layer

`src/features/review/domain/review-entities.ts`:

```ts
export type Review = {
  id: string
  productId: string
  userId: string
  rating: number
  comment: string | null
  createdAt: Date
}

export type ReviewDTO = Omit<Review, 'createdAt'> & {
  createdAt: string
}
```

`src/features/review/domain/review-schemas.ts`:

```ts
import { z } from 'zod'

export const createReviewSchema = z.object({
  productId: z.string().cuid(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().trim().max(500).optional()
})

export type CreateReviewInput = z.infer<typeof createReviewSchema>
```

`src/features/review/domain/review-mappers.ts`:

```ts
import type { Review as PrismaReview } from '@/infrastructure/database/generated'
import type { Review, ReviewDTO } from './review-entities'

export const toReview = (row: PrismaReview): Review => ({
  id: row.id,
  productId: row.productId,
  userId: row.userId,
  rating: row.rating,
  comment: row.comment,
  createdAt: row.createdAt
})

export const toReviewDTO = (review: Review): ReviewDTO => ({
  ...review,
  createdAt: review.createdAt.toISOString()
})
```

### 3. Create the repository

`src/features/review/infrastructure/review-repository.ts`:

```ts
import 'server-only'

import { prisma } from '@/infrastructure/database'

import { toReview } from '../domain/review-mappers'
import type { Review } from '../domain/review-entities'
import type { CreateReviewInput } from '../domain/review-schemas'

export const reviewRepository = {
  findByProduct: async (productId: string): Promise<Review[]> => {
    const rows = await prisma.review.findMany({ where: { productId } })
    return rows.map(toReview)
  },

  create: async (userId: string, input: CreateReviewInput): Promise<Review> => {
    const row = await prisma.review.create({
      data: {
        productId: input.productId,
        userId,
        rating: input.rating,
        comment: input.comment ?? null
      }
    })
    return toReview(row)
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await prisma.review.delete({ where: { id } })
      return true
    } catch {
      return false
    }
  }
}
```

### 4. Create the service (business logic)

`src/features/review/application/review-service.ts`:

```ts
import 'server-only'

import { failure, success, type Result } from '@/helpers/result'

import { reviewRepository } from '../infrastructure/review-repository'
import type { Review } from '../domain/review-entities'
import type { CreateReviewInput } from '../domain/review-schemas'

type CreateReviewError = 'DUPLICATE' | 'PRODUCT_NOT_FOUND'

export const reviewService = {
  listByProduct: async (productId: string): Promise<Result<Review[]>> => {
    const reviews = await reviewRepository.findByProduct(productId)
    return success(reviews)
  },

  create: async (
    userId: string,
    input: CreateReviewInput
  ): Promise<Result<Review, CreateReviewError>> => {
    // Rely on the unique (productId, userId) constraint to prevent duplicates.
    try {
      const review = await reviewRepository.create(userId, input)
      return success(review)
    } catch {
      return failure('DUPLICATE')
    }
  }
}
```

### 5. Create the controller (server-side)

`src/features/review/presentation/controllers/review-controller.ts`:

```ts
import 'server-only'

import { reviewService } from '../../application/review-service'
import { toReviewDTO } from '../../domain/review-mappers'
import type { CreateReviewInput } from '../../domain/review-schemas'
import type { ReviewDTO } from '../../domain/review-entities'

type ControllerResponse<T> =
  | { status: 200; data: T }
  | { status: 400 | 404 | 409 | 500; error: string }

export const ReviewController = {
  findByProduct: async (productId: string): Promise<ControllerResponse<ReviewDTO[]>> => {
    const result = await reviewService.listByProduct(productId)
    if (result.status === 'ERROR') return { status: 500, error: 'INTERNAL' }
    return { status: 200, data: result.data.map(toReviewDTO) }
  },

  create: async (
    userId: string,
    input: CreateReviewInput
  ): Promise<ControllerResponse<ReviewDTO>> => {
    const result = await reviewService.create(userId, input)
    if (result.status === 'ERROR') {
      if (result.error === 'DUPLICATE') return { status: 409, error: 'DUPLICATE' }
      return { status: 500, error: 'INTERNAL' }
    }
    return { status: 200, data: toReviewDTO(result.data) }
  }
}
```

### 6. Create the API client (for client components)

`src/features/review/infrastructure/review-client.ts`:

```ts
import type { ReviewDTO } from '../domain/review-entities'
import type { CreateReviewInput } from '../domain/review-schemas'

export const ReviewClient = {
  findByProduct: async (productId: string) => {
    const res = await fetch(`/api/products/${productId}/reviews`)
    const body = await res.json()
    return body as { status: number; data?: ReviewDTO[]; error?: string }
  },

  create: async (input: CreateReviewInput) => {
    const res = await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    })
    return res.json() as Promise<{ status: number; data?: ReviewDTO; error?: string }>
  }
}
```

### 7. Create the API route

`src/app/api/reviews/route.ts`:

```ts
import { NextResponse } from 'next/server'

import { auth } from '@/features/auth/infrastructure/auth-lib'
import { ReviewController } from '@/features/review/presentation/controllers/review-controller'
import { createReviewSchema } from '@/features/review/domain/review-schemas'

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers })
  if (!session) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })

  const body = await req.json()
  const parsed = createReviewSchema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 })

  const response = await ReviewController.create(session.user.id, parsed.data)
  return NextResponse.json(response, { status: response.status })
}
```

### 8. Use it in the UI

Server component (product page):

```tsx
import { ReviewController } from '@/features/review/presentation/controllers/review-controller'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const reviews = await ReviewController.findByProduct(params.id)
  if (reviews.status !== 200) return <p>Failed to load reviews</p>
  return <ReviewList reviews={reviews.data} />
}
```

Client component (review form):

```tsx
'use client'

import { ReviewClient } from '@/features/review/infrastructure/review-client'

export const NewReviewForm = ({ productId }: { productId: string }) => {
  const handleSubmit = async (rating: number, comment: string) => {
    const res = await ReviewClient.create({ productId, rating, comment })
    if (res.status !== 200) {
      // show a toast, handle res.error
    }
  }
  // ...
}
```

## Checklist when adding a feature

- [ ] Schema updated, migration named explicitly, Prisma client regenerated.
- [ ] `domain/` files: entities, schemas, constants, mappers (only what you need).
- [ ] `application/<name>-service.ts` with `Result` return types.
- [ ] `infrastructure/<name>-repository.ts` with `server-only` at the top.
- [ ] `infrastructure/<name>-client.ts` for client components if needed.
- [ ] `presentation/controllers/<name>-controller.ts` mapping `Result` → HTTP.
- [ ] API route(s) in `src/app/api/...` validating input with Zod.
- [ ] UI components under `presentation/components/`.
- [ ] French copy added to `src/infrastructure/i18n/dictionaries/fr.ts` (if user-visible).
- [ ] `pnpm lint` passes.

## Modifying an existing feature

Most of the time you will:

1. Read the existing `*-service.ts` to understand current behaviour.
2. Adjust `*-entities.ts` / `*-schemas.ts` if the shape changes.
3. Update the service with the new use case (Result return preserved).
4. Update the controller + API route if you are exposing a new endpoint.
5. Update the UI components.
6. Run `pnpm lint` and `pnpm build`.

Resist the urge to refactor the whole feature while you are there. Ship the change, open a dedicated PR for cleanups.
