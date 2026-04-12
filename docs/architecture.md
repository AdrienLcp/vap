# Architecture

The project follows a **feature-first** approach combined with **clean architecture**. The goal: every business domain is isolated, dependencies point in a single direction, and business logic stays testable without Next.js.

## Overview

```
src/
├── app/                         # Next.js App Router
│   ├── api/                     # API routes (Route Handlers)
│   ├── admin/                   # Admin pages
│   ├── auth/                    # Auth pages
│   ├── products/                # Product pages
│   ├── layout.tsx
│   ├── page.tsx                 # Home
│   ├── loading.tsx
│   └── error.tsx
│
├── features/                    # One folder per business domain
│   ├── address/
│   ├── admin/
│   ├── auth/
│   ├── cart/
│   ├── category/
│   ├── home/
│   ├── order/
│   ├── payment/
│   ├── product/
│   └── user/
│
├── infrastructure/              # Shared technical services
│   ├── api/                     # Fetch helper, HTTP status codes
│   ├── database/                # Prisma client + generated + migrations + seed
│   ├── env/                     # T3 Env validation
│   ├── format/                  # Formatting helpers
│   ├── i18n/                    # Dictionaries + t() function
│   ├── storage/                 # LocalStorage wrapper
│   ├── url/                     # URL helpers
│   └── src/
│
├── domain/                      # Shared business entities (cross-feature)
├── presentation/                # Shared global UI components
├── helpers/                     # Result pattern
└── utils/                       # Pure helpers (array, format, object, validation)
```

## Structure of a feature

Every feature replicates the same layout. Example with `product`:

```
features/product/
├── domain/
│   ├── product-entities.ts      # Business types (Product, ProductDTO…)
│   ├── product-schemas.ts       # Zod schemas
│   ├── product-constants.ts     # Constants and enums
│   └── product-mappers.ts       # DB → domain, domain → DTO
│
├── application/
│   └── product-service.ts       # Business logic (use cases)
│
├── infrastructure/
│   ├── product-repository.ts    # Prisma access
│   └── product-client.ts        # API client (called from client components)
│
└── presentation/
    ├── controllers/
    │   └── product-controller.ts # Server-side controller
    ├── components/              # React components
    └── validation/              # UI validation (forms)
```

## Dependency rule

```
presentation → application → infrastructure → domain
```

- **`domain/`** depends on nothing else (not on `application`, `infrastructure`, or Next).
- **`application/`** may import `domain/` and `infrastructure/`.
- **`infrastructure/`** may import `domain/`, never `application/`.
- **`presentation/`** may import everything, but server-side only for infrastructure layers.

This rule keeps business logic (`application/`) testable without a database or a framework.

## Server vs Client: two data paths

Next.js offers two kinds of components, and the project handles each with a clear path.

### 1. Server Component → direct controller

Pages and layouts are **async server components**. They call **controllers** (presentation layer) directly, which in turn call **services** (application layer).

```tsx
// src/app/products/page.tsx
import { ProductController } from '@/features/product/presentation/controllers/product-controller'

export default async function ProductsPage() {
  const response = await ProductController.findProducts()

  if (response.status !== 200) {
    return <p>Failed to load products</p>
  }

  return <ProductGrid products={response.data} />
}
```

No HTTP fetch. No network boundary. The controller is a server module that reads from Prisma via the repository directly.

### 2. Client Component → API Route → Controller

Interactive components (`'use client'`) cannot access Prisma. They go through:

1. An **API client** (`product-client.ts`) that calls `fetch('/api/products')`.
2. An **API route** (`src/app/api/products/route.ts`) that calls the same controller.
3. The **controller** calls the **service** → **repository** → Prisma.

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

Result: a single controller serves both paths (SSR and CSR) with zero duplication of business logic.

## Result pattern

Business logic never `throw`s. It returns a `Result<Data, Error>`:

```ts
import { success, failure, type Result } from '@/helpers/result'

type FindProductError = 'NOT_FOUND' | 'DATABASE_ERROR'

export const findProduct = async (
  id: string
): Promise<Result<Product, FindProductError>> => {
  const product = await productRepository.findById(id)
  if (!product) return failure('NOT_FOUND')
  return success(product)
}
```

At the call site:

```ts
const result = await findProduct(id)

if (result.status === 'ERROR') {
  // result.error is typed: 'NOT_FOUND' | 'DATABASE_ERROR' | 'UNEXPECTED_ERROR'
  return
}

// here TS knows result is a SuccessResult
// result.data is typed as Product
```

Benefits:

- Business errors are **typed** and visible in the signature.
- No `try/catch` inside business logic.
- Controllers map `Result` → HTTP status (200 / 4xx / 5xx).

## Zod validation — at the boundary only

- API routes and form actions validate incoming data with a Zod schema before passing to a service.
- Services and repositories receive **already typed** data, not `unknown`.
- Zod schemas live in `features/<x>/domain/<x>-schemas.ts`.

## Full request flow (example: add a product to the cart)

### Client component

```tsx
'use client'
const handleAdd = () => CartClient.addItem({ productId, quantity: 1 })
```

### cart-client.ts (features/cart/infrastructure)

```ts
export const CartClient = {
  addItem: (payload) => fetch('/api/cart/items', { method: 'POST', body: JSON.stringify(payload) }).then(...)
}
```

### API route (src/app/api/cart/items/route.ts)

```ts
export async function POST(req: Request) {
  const body = await req.json()
  const parsed = addCartItemSchema.safeParse(body)
  if (!parsed.success) return new Response('Invalid', { status: 400 })
  const response = await CartController.addItem(parsed.data)
  return Response.json(response)
}
```

### Controller (features/cart/presentation/controllers/cart-controller.ts)

```ts
export const CartController = {
  addItem: async (input) => {
    const result = await cartService.addItem(input)
    if (result.status === 'ERROR') return { status: 400, error: result.error }
    return { status: 200, data: result.data }
  }
}
```

### Service (features/cart/application/cart-service.ts)

```ts
export const cartService = {
  addItem: async (input) => {
    const product = await productRepository.findById(input.productId)
    if (!product) return failure('PRODUCT_NOT_FOUND')
    if (product.stock < input.quantity) return failure('OUT_OF_STOCK')
    const item = await cartRepository.upsert(input)
    return success(item)
  }
}
```

### Repository (features/cart/infrastructure/cart-repository.ts)

```ts
export const cartRepository = {
  upsert: (input) => prisma.cartItem.upsert({ ... })
}
```

Each layer owns a single responsibility. Each layer can be replaced without touching the others.

## Shared features and layers

- **`src/infrastructure/`**: cross-feature technical services (Prisma client, env validation, i18n, storage, fetch helper).
- **`src/domain/`**: transverse entities (`entities.ts`, `navigation.ts`).
- **`src/presentation/`**: generic UI components (Avatar, Button, Card, Menu…), hooks, toast service, global styles, UI utils.
- **`src/helpers/result.ts`**: Result pattern.
- **`src/utils/`**: pure helpers (array, format, object, validation).

## File naming conventions

| Suffix | Layer | Content |
|---|---|---|
| `*-entities.ts` | domain | TS types (interfaces, DTOs) |
| `*-schemas.ts` | domain | Zod schemas |
| `*-constants.ts` | domain | Constants, enums |
| `*-mappers.ts` | domain | DB ↔ domain ↔ DTO conversions |
| `*-service.ts` | application | Business logic (use cases) |
| `*-repository.ts` | infrastructure | Prisma access |
| `*-client.ts` | infrastructure | API client (fetch) |
| `*-controller.ts` | presentation | Server-side controller |
| `*-lib.ts` | infrastructure | External lib wrapper (Stripe, Better Auth) |

## Key takeaways

1. **Feature-first**: organize by business domain, not by technical type.
2. **One-way dependencies**: `domain` depends on nothing, `application` does not know `presentation`.
3. **Result pattern**: no exceptions in business logic.
4. **Two data paths**: server component → direct controller, client component → API route → controller.
5. **Boundary validation**: Zod on external inputs, TS types everywhere else.
6. **Single controllers**: one controller serves both SSR and CSR with zero duplication.
