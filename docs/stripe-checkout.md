# Stripe Checkout — Session Handoff

Branch: `stripe`. Goal: integrate Stripe Checkout Session (hosted flow) as the payment method for cart → order conversion.

## What is done

### Schema / DB
- Added `stripeCheckoutSessionId` and `stripePaymentIntentId` on `orders` (both unique, nullable).
- Drizzle schema in `src/features/order/infrastructure/order-schema.ts`, migration applied.

### Env
- `STRIPE_WEBHOOK_SECRET` added to `src/infrastructure/env/server.ts` and `.env.example`.
- Local `.env` must contain `STRIPE_API_KEY` (sk_test) and `STRIPE_WEBHOOK_SECRET` (whsec from Stripe CLI).

### Backend
- `src/features/order/domain/order-schemas.ts` / `order-entities.ts` — rewritten so `OrderDTO` matches the new schema.
- `src/features/order/infrastructure/order-repository.ts` — fixed (previous `createOrder` was broken) and extended with `findOrder`, `findOrderByStripeCheckoutSessionId`, `updateOrderStripeCheckoutSessionId`, `markOrderPaid`, `markOrderCancelled`.
- `src/features/order/application/order-service.ts` — new. Exposes `createPendingOrderFromCart(shippingAddressId)` and `findOrder`.
- `src/features/payment/application/checkout-service.ts` — new. `createCheckoutSession(shippingAddressId)` reads the cart, creates a pending Order, builds Stripe Checkout line items inline (`price_data`, no catalog sync), creates the Session with `metadata.orderId`, stores `session.id` on the Order, returns `{ url }`.
- `src/features/payment/application/stripe-webhook-service.ts` — new. Verifies signature via `stripe.webhooks.constructEvent`, handles `checkout.session.completed` (mark PAID, set `stripePaymentIntentId`, decrement stock, bump `salesCount`, clear cart), `checkout.session.expired` and `payment_intent.payment_failed` (mark CANCELLED).
- `src/features/payment/presentation/controllers/checkout-controller.ts` — new. Validates `{ shippingAddressId }` body, calls the service, maps errors to HTTP responses.
- `src/features/payment/infrastructure/checkout-client.ts` — new. Client-side API wrapper for `POST /api/checkout`.

### Routes
- `src/app/api/checkout/route.ts` — `POST` handler calling `CheckoutController`.
- `src/app/api/webhooks/stripe/route.ts` — raw-body `POST` handler (uses `request.text()` for signature verification). Returns 400 on invalid signature, 200 on success.

### UI
- `src/features/payment/presentation/components/checkout-review-page.tsx` — client component: cart summary (Zustand store), shipping address select (`AddressClient.findUserAddresses`), "Pay" button that calls `CheckoutClient.createCheckoutSession` and `window.location.href = url`.
- `src/features/payment/presentation/components/checkout-success-page.tsx` — clears the Zustand cart store, displays confirmation.
- `src/features/payment/presentation/components/checkout-cancel-page.tsx` — cancel message.
- `src/app/checkout/page.tsx`, `src/app/checkout/success/page.tsx`, `src/app/checkout/cancel/page.tsx` — thin page wrappers.
- `src/domain/navigation.ts` — `ROUTES.checkout`, `ROUTES.checkoutSuccess`, `ROUTES.checkoutCancel`.
- `src/features/cart/presentation/components/cart-order-link.tsx` — now points to `ROUTES.checkout` (previously `ROUTES.ordering`, which had no page).
- `src/infrastructure/i18n/dictionaries/fr.ts` — added `checkout.*` keys.

## What is NOT done

- **No UI styling.** The checkout pages have no SASS module — they render as plain HTML. `.checkout-review-page`, `.checkout-success-page`, `.checkout-cancel-page` CSS classes are referenced but not defined.
- **No end-to-end test run yet.** The code compiles (lint clean) but the flow has never been exercised against a real Stripe test session.
- **Success page does not fetch the order.** It only clears the store and shows a generic thank-you. If you want to show a summary, read `session_id` from the URL and fetch the Order by `stripeCheckoutSessionId`.
- **No handling for the `/orders/ordering` route.** It still exists in `ROUTES` (`navigation.ts`) but is now orphaned. Consider removing it or creating a redirect.
- **No Stripe Customer.** We don't create a Stripe Customer for the user. For one-shot Checkout this is fine; if you later want saved cards, this is where to start (`stripeCustomerId` on `User`, created on first checkout, passed as `customer` in `sessions.create`).

## Known pre-existing bug (not caused by this work)

`src/features/payment/application/payment-service.ts:152` — `setUserDefaultPaymentMethod` calls `PaymentRepository.updateUserPaymentMethod(userId, paymentMethodId, { isDefault: true })` but the update schema requires `name`. TS error:

```
Property 'name' is missing in type '{ isDefault: true; }' but required in type '...'.
```

This was already broken before the Stripe work and is out of scope here.

## How to resume

### Prerequisites
- Docker running (`pnpm dev` will boot the Postgres container).
- `STRIPE_API_KEY` (sk_test_…) and `STRIPE_WEBHOOK_SECRET` (whsec_…) set in `.env`.
- Stripe CLI installed (already in `~/bin/stripe.exe`, `stripe --version` should work).
- Stripe CLI is authenticated. If `stripe listen --print-secret` returns "You have not configured API keys", re-run `stripe login`.

### Run the stack

Three terminals:

```bash
# Terminal 1 — app
pnpm dev

# Terminal 2 — Stripe webhook forwarder (must stay running)
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Terminal 3 — free for commands
```

If `stripe listen` prints a new `whsec_…`, update `STRIPE_WEBHOOK_SECRET` in `.env` and restart `pnpm dev`.

### Manual test flow

1. Log in to the app (Google OAuth or email/password).
2. Ensure the user has at least one address. If not: `/auth/addresses/create`.
3. Add a product to cart from the home or product page.
4. Open the cart panel, click "Payer" → lands on `/checkout`.
5. Select shipping address, click "Payer" → redirects to Stripe Checkout page.
6. Use test card `4242 4242 4242 4242`, any future expiry, CVC `123`, any ZIP.
7. On success, Stripe redirects to `/checkout/success`. Stripe CLI (terminal 2) should show `checkout.session.completed` being forwarded and a `200` response from the webhook.
8. Check the DB: the Order row should be `PAID`, have a `stripePaymentIntentId`, and the cart should be empty.

### Useful test commands (Stripe CLI)

```bash
# Manually trigger events
stripe trigger checkout.session.completed
stripe trigger checkout.session.expired
stripe trigger payment_intent.payment_failed

# Tail events for your account
stripe events resend <evt_id>
```

## Files touched (for quick diff review)

```
src/features/order/infrastructure/order-schema.ts
src/infrastructure/database/migrations/<new>_stripe_checkout.sql
src/infrastructure/database/database-seed.ts  (earlier fix: use process.env.DATABASE_URL)
src/infrastructure/env/server.ts
.env.example

src/features/order/domain/order-schemas.ts
src/features/order/domain/order-entities.ts
src/features/order/infrastructure/order-repository.ts
src/features/order/application/order-service.ts  (new)

src/features/payment/application/checkout-service.ts  (new)
src/features/payment/application/stripe-webhook-service.ts  (new)
src/features/payment/presentation/controllers/checkout-controller.ts  (new)
src/features/payment/infrastructure/checkout-client.ts  (new)
src/features/payment/presentation/components/checkout-review-page.tsx  (new)
src/features/payment/presentation/components/checkout-success-page.tsx  (new)
src/features/payment/presentation/components/checkout-cancel-page.tsx  (new)

src/app/api/checkout/route.ts  (new)
src/app/api/webhooks/stripe/route.ts  (new)
src/app/checkout/page.tsx  (new)
src/app/checkout/success/page.tsx  (new)
src/app/checkout/cancel/page.tsx  (new)

src/domain/navigation.ts
src/features/cart/presentation/components/cart-order-link.tsx
src/infrastructure/i18n/dictionaries/fr.ts
```

## Next likely tasks

1. Run the E2E test flow above. Fix whatever breaks first.
2. Add SASS modules for the three checkout pages.
3. Improve the success page: read `session_id` from the query, fetch the Order, show items + total.
4. Remove the orphaned `ROUTES.ordering` entry or repurpose it.
5. Fix the pre-existing `setUserDefaultPaymentMethod` bug.
6. (Optional, later) Add Stripe Customer linkage for saved-card flow.
