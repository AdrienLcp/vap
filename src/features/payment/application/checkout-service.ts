import 'server-only'

import type { BadRequest, NotFound, Unauthorized } from '@/domain/entities'
import { CartRepository } from '@/features/cart/infrastructure/cart-repository'
import { OrderService } from '@/features/order/application/order-service'
import { OrderRepository } from '@/features/order/infrastructure/order-repository'
import { stripe } from '@/features/payment/infrastructure/payment-lib'
import { failure, type Result, success } from '@/helpers/result'
import { CLIENT_ENV } from '@/infrastructure/env/client'

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

const createCheckoutSession = async (
  shippingAddressId: string
): Promise<Result<{ url: string }, CheckoutError>> => {
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

  const successUrl = new URL(
    '/checkout/success',
    CLIENT_ENV.NEXT_PUBLIC_APP_URL
  )
  successUrl.searchParams.set('session_id', '{CHECKOUT_SESSION_ID}')
  const cancelUrl = new URL('/checkout/cancel', CLIENT_ENV.NEXT_PUBLIC_APP_URL)

  try {
    const session = await stripe.checkout.sessions.create({
      cancel_url: cancelUrl.toString(),
      client_reference_id: order.user.id,
      line_items: lineItemsResult.data,
      metadata: { orderId: order.id },
      mode: 'payment',
      payment_intent_data: {
        metadata: { orderId: order.id }
      },
      success_url: successUrl.toString()
    })

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
