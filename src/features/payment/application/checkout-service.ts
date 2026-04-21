import 'server-only'

import type { BadRequest, NotFound, Unauthorized } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import { CartRepository } from '@/features/cart/infrastructure/cart-repository'
import { OrderService } from '@/features/order/application/order-service'
import { OrderRepository } from '@/features/order/infrastructure/order-repository'
import { stripe } from '@/features/payment/infrastructure/payment-lib'
import { StripeCustomerRepository } from '@/features/payment/infrastructure/stripe-customer-repository'
import { failure, type Result, success } from '@/helpers/result'
import { CLIENT_ENV } from '@/infrastructure/env/client'
import { t } from '@/infrastructure/i18n'

type CheckoutError = BadRequest | NotFound | Unauthorized

type CheckoutSessionCreateParams = NonNullable<
  Parameters<typeof stripe.checkout.sessions.create>[0]
>

type CheckoutLineItem = NonNullable<
  CheckoutSessionCreateParams['line_items']
>[number]

const STRIPE_CURRENCY = 'eur'
const STRIPE_AMOUNT_MULTIPLIER = 100

const toStripeAmount = (price: number) =>
  Math.round(price * STRIPE_AMOUNT_MULTIPLIER)

const buildLineItems = async (
  userId: string
): Promise<Result<CheckoutLineItem[], BadRequest>> => {
  const cartResult = await CartRepository.findUserCartItems(userId)

  if (cartResult.status === 'ERROR') {
    return failure('BAD_REQUEST')
  }

  if (cartResult.data.length === 0) {
    return failure('BAD_REQUEST')
  }

  const lineItems: CheckoutLineItem[] = cartResult.data.map((item) => ({
    price_data: {
      currency: STRIPE_CURRENCY,
      product_data: {
        images: item.product.imageUrl ? [item.product.imageUrl] : undefined,
        name: item.product.name
      },
      unit_amount: toStripeAmount(
        item.product.discountedPrice ?? item.product.price
      )
    },
    quantity: item.quantity
  }))

  return success(lineItems)
}

const cleanupUserPendingOrders = async (userId: string): Promise<void> => {
  const pendingResult = await OrderRepository.findUserPendingOrders(userId)

  if (pendingResult.status === 'ERROR') {
    return
  }

  for (const pending of pendingResult.data) {
    if (pending.stripeCheckoutSessionId) {
      try {
        await stripe.checkout.sessions.expire(pending.stripeCheckoutSessionId)
      } catch (error) {
        console.error(
          'Failed to expire Stripe session',
          pending.stripeCheckoutSessionId,
          error
        )
      }
    }
    await OrderRepository.markOrderCancelled(pending.id)
  }
}

const createCheckoutSession = async (
  shippingAddressId: string
): Promise<Result<{ url: string }, CheckoutError>> => {
  const userResult = await AuthService.findUser()

  if (userResult.status === 'ERROR') {
    return userResult
  }

  const customerResult =
    await StripeCustomerRepository.findOrCreateStripeCustomer(
      userResult.data.id,
      userResult.data.email,
      userResult.data.name
    )
  const stripeCustomerId =
    customerResult.status === 'SUCCESS' ? customerResult.data : undefined

  await cleanupUserPendingOrders(userResult.data.id)

  const orderResult =
    await OrderService.createPendingOrderFromCart(shippingAddressId)

  if (orderResult.status === 'ERROR') {
    return orderResult
  }

  const order = orderResult.data

  const lineItemsResult = await buildLineItems(order.user.id)

  if (lineItemsResult.status === 'ERROR') {
    return lineItemsResult
  }

  const lineItems: CheckoutLineItem[] = [...lineItemsResult.data]

  if (order.shippingCost > 0) {
    lineItems.push({
      price_data: {
        currency: STRIPE_CURRENCY,
        product_data: { name: t('checkout.shippingLineItem') },
        unit_amount: toStripeAmount(order.shippingCost)
      },
      quantity: 1
    })
  }

  const successUrl = new URL(
    '/checkout/success',
    CLIENT_ENV.NEXT_PUBLIC_APP_URL
  )
  successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')
  const cancelUrl = new URL('/checkout/cancel', CLIENT_ENV.NEXT_PUBLIC_APP_URL)

  try {
    const session = await stripe.checkout.sessions.create(
      {
        cancel_url: cancelUrl.toString(),
        client_reference_id: order.user.id,
        customer: stripeCustomerId,
        line_items: lineItems,
        metadata: { orderId: order.id },
        mode: 'payment',
        payment_intent_data: {
          metadata: { orderId: order.id }
        },
        saved_payment_method_options: stripeCustomerId
          ? { payment_method_save: 'enabled' }
          : undefined,
        success_url: successUrl.toString()
      },
      { idempotencyKey: `checkout-session:${order.id}` }
    )

    if (!session.url) {
      console.error('Stripe checkout session created without url:', session.id)
      return failure()
    }

    const updateResult =
      await OrderRepository.updateOrderStripeCheckoutSessionId(
        order.id,
        session.id
      )

    if (updateResult.status === 'ERROR') {
      return updateResult
    }

    return success({ url: session.url })
  } catch (error) {
    console.error(
      'Unknown error in CheckoutService.createCheckoutSession:',
      error
    )
    return failure()
  }
}

export const CheckoutService = {
  createCheckoutSession
}
