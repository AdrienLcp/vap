import 'server-only'

import type Stripe from 'stripe'

import { CartRepository } from '@/features/cart/infrastructure/cart-repository'
import { PaymentEmailService } from '@/features/email/application/payment-email-service'
import { OrderRepository } from '@/features/order/infrastructure/order-repository'
import { stripe } from '@/features/payment/infrastructure/payment-lib'
import { failure, type Result, success } from '@/helpers/result'
import { ProductDatabase } from '@/infrastructure/database'
import { SERVER_ENV } from '@/infrastructure/env/server'

type WebhookError = 'INVALID_SIGNATURE' | 'NOT_FOUND'

const constructEvent = (
  payload: string,
  signature: string
): Stripe.Event | null => {
  try {
    return stripe.webhooks.constructEvent(
      payload,
      signature,
      SERVER_ENV.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Stripe webhook signature verification failed:', error)
    return null
  }
}

const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
): Promise<Result<null, 'NOT_FOUND'>> => {
  const orderId = session.metadata?.orderId

  if (!orderId) {
    console.error(
      'checkout.session.completed received without orderId metadata:',
      session.id
    )
    return failure('NOT_FOUND')
  }

  const paymentIntentId =
    typeof session.payment_intent === 'string'
      ? session.payment_intent
      : session.payment_intent?.id

  if (!paymentIntentId) {
    console.error(
      'checkout.session.completed without payment_intent:',
      session.id
    )
    return failure('NOT_FOUND')
  }

  const markResult = await OrderRepository.markOrderPaid(
    orderId,
    paymentIntentId
  )

  if (markResult.status === 'ERROR') {
    return markResult.error === 'NOT_FOUND' ? failure('NOT_FOUND') : failure()
  }

  const orderResult = await OrderRepository.findOrder(orderId)

  if (orderResult.status === 'SUCCESS') {
    for (const item of orderResult.data.items) {
      try {
        await ProductDatabase.update({
          data: {
            salesCount: { increment: item.quantity },
            stock: { decrement: item.quantity }
          },
          where: { id: item.product.id }
        })
      } catch (error) {
        console.error(
          'Failed to decrement stock for product',
          item.product.id,
          error
        )
      }
    }

    const clearResult = await CartRepository.clearUserCart(
      orderResult.data.user.id
    )

    if (clearResult.status === 'ERROR') {
      console.error('Failed to clear cart after payment:', orderId)
    }

    const emailResult = await PaymentEmailService.sendPaymentConfirmationEmail(
      orderResult.data
    )

    if (emailResult.status === 'ERROR') {
      console.error('Failed to send payment confirmation email:', orderId)
    }
  }

  return success()
}

const handleCheckoutSessionExpired = async (
  session: Stripe.Checkout.Session
): Promise<Result<null, 'NOT_FOUND'>> => {
  const orderId = session.metadata?.orderId

  if (!orderId) {
    return failure('NOT_FOUND')
  }

  const result = await OrderRepository.markOrderCancelled(orderId)

  if (result.status === 'ERROR') {
    return result.error === 'NOT_FOUND' ? failure('NOT_FOUND') : failure()
  }

  return success()
}

const handlePaymentIntentFailed = async (
  paymentIntent: Stripe.PaymentIntent
): Promise<Result<null, 'NOT_FOUND'>> => {
  const orderId = paymentIntent.metadata?.orderId

  if (!orderId) {
    return failure('NOT_FOUND')
  }

  const result = await OrderRepository.markOrderCancelled(orderId)

  if (result.status === 'ERROR') {
    return result.error === 'NOT_FOUND' ? failure('NOT_FOUND') : failure()
  }

  return success()
}

const handleEvent = async (
  payload: string,
  signature: string
): Promise<Result<null, WebhookError>> => {
  const event = constructEvent(payload, signature)

  if (!event) {
    return failure('INVALID_SIGNATURE')
  }

  switch (event.type) {
    case 'checkout.session.completed':
      return await handleCheckoutSessionCompleted(event.data.object)
    case 'checkout.session.expired':
      return await handleCheckoutSessionExpired(event.data.object)
    case 'payment_intent.payment_failed':
      return await handlePaymentIntentFailed(event.data.object)
    default:
      return success()
  }
}

export const StripeWebhookService = {
  handleEvent
}
