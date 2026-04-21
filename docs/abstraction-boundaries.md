# Abstraction boundaries

> Abstract capabilities, not libraries.

## The principle

Draw abstraction boundaries around **business capabilities**, not around **library primitives**. This is the essence of **Hexagonal Architecture** (Ports and Adapters, Alistair Cockburn): the application core depends on a **port** expressed in domain vocabulary (`ProductRepository.findById`, `EmailSender.sendWelcome`, `PaymentGateway.charge`), and an **adapter** in the infrastructure layer translates that port into calls to the underlying SDK, ORM or client.

Adding a *second*, thinner layer below the adapter — a generic `database.create()`, a unified "email provider" interface, a neutral "payment SDK" — looks like defensive architecture. It is almost always an anti-pattern.

## Where this repository already draws the boundary

The boundary is the **repository** (for Drizzle), the **`*-lib.ts`** wrapper (for Better Auth, Stripe), the **`*-sender.ts`** adapter (for Resend), the **`*-client.ts`** module (for the HTTP layer consumed by client components). The domain and application layers know *only* those ports; the adapters own every vendor-specific detail.

That is already the full hexagonal boundary. Nothing belongs below it.

## Why generic library wrappers fail

### 1. They leak

Every non-trivial library ships its own vocabulary. Drizzle has `onConflictDoUpdate`, transactions, prepared statements, relational queries, typed inference. Stripe has idempotency keys, webhooks, retries, test clocks. Better Auth has lifecycle hooks and typed session shapes. Resend has scheduled sends and domain verification.

A generic `database.create()` wrapper faces a no-win choice:

- **expose those primitives** — and the abstraction becomes a pass-through that isolates nothing, or
- **flatten to the lowest common denominator** — and the calling code must re-implement every missing capability by hand.

Either way the decision the wrapper claimed to isolate has already leaked through.

### 2. They do not pay off at migration time

The cost of replacing an ORM or an SDK lives in the **shape** of the vendor's model: schema DSL, transaction semantics, inferred types, event lifecycle, error categories. A thin `db.create()` wrapper smooths over none of that.

This repository's own **Prisma → Drizzle** migration is direct proof. The work was concentrated in:

- rewriting every `schema.prisma` entity as a Drizzle TS schema,
- reworking relations, enums and default values,
- rewriting every query site because `findUnique({ where })` / `select.table.where()` are not interchangeable,
- rebuilding type inference around `InferSelectModel` / `InferInsertModel`.

No conceivable `db.create()` wrapper would have reduced that work. The migration happens at the adapter, and that is both inevitable and correct.

### 3. They carry an ongoing cost

You pay, every day, for:

- extra indirection (harder to read, harder to debug),
- loss of library-specific optimisations (Drizzle's typed joins, Stripe idempotency keys, Better Auth session hooks),
- duplicated maintenance whenever the upstream API evolves,
- drag on every new feature, because the wrapper must be extended before it can be used.

…in exchange for a benefit that materialises once every few years at best, and that the wrapper does not actually deliver when it does.

This is textbook **YAGNI** (*You Aren't Gonna Need It*), compounded by a broken promise.

## Where the boundary goes

Draw the boundary at the **domain verb**, not at the **technical verb**.

| Anti-pattern (leaky technical wrapper) | Correct (domain port) |
|---|---|
| `database.create(table, row)` | `productRepository.create(product)` |
| `emailClient.send(options)` | `welcomeEmailService.send(user)` |
| `paymentSdk.charge(params)` | `paymentGateway.chargeOrder(order)` |
| `httpClient.request(config)` | `ProductClient.findProducts(query)` |
| `storage.get(key)` | dedicated feature storage module |

Each port is the *only* thing the application layer knows. Behind the port, the adapter is free to use every idiom, optimisation and quirk the vendor offers.

## The enforceable rule

**External libraries may only be imported from `infrastructure/`.** Concretely, for this repo:

- `drizzle-orm` → only inside `*-repository.ts` and `src/infrastructure/database/`
- `better-auth` → only inside `src/features/auth/infrastructure/auth-lib.ts` and `auth-client.ts`
- `stripe` → only inside `src/features/payment/infrastructure/payment-lib.ts`
- `resend`, `@react-email/*` → only inside `src/features/email/infrastructure/email-sender.ts` and email templates
- `nuqs`, Zustand stores → client-side only, inside `presentation/` hooks

If you see `import Stripe from 'stripe'` in a service, a page or a component, the design is broken. The fix is not to add another wrapper — it is to move the call behind the existing port, or to introduce a missing one.

## When a swap does happen

When the day genuinely comes to replace a library, a hexagonal design delivers exactly what it promised:

- port signatures are untouched,
- `application/` and `domain/` are untouched,
- the migration is a rewrite of one adapter per port, contained and reviewable.

Nothing thinner — no extra wrapper, no common-denominator interface — would reduce the work any further, and every attempt to try degrades the rest of the codebase in the meantime.

## TL;DR

- Abstract **capabilities**, not **libraries**.
- The repository / `*-lib.ts` / `*-sender.ts` / `*-client.ts` **is** the boundary — no second, thinner layer underneath.
- External SDKs live strictly inside `infrastructure/`; any leak upward is a design bug.
- Generic `db.create()`-style wrappers are leaky, expensive, and do not pay back at migration time — the Prisma → Drizzle migration confirmed this.
