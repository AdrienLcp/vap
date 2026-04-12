import { NextResponse } from 'next/server'

import { StripeWebhookService } from '@/features/payment/application/stripe-webhook-service'

export const POST = async (request: Request) => {
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return new NextResponse('Missing stripe-signature header', { status: 400 })
  }

  const payload = await request.text()

  const result = await StripeWebhookService.handleEvent(payload, signature)

  if (result.status === 'ERROR') {
    if (result.error === 'INVALID_SIGNATURE') {
      return new NextResponse('Invalid signature', { status: 400 })
    }
    return new NextResponse(null, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
