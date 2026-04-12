import 'server-only'

import { createElement } from 'react'

import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { PaymentConfirmationEmail } from '@/features/email/presentation/templates/payment-confirmation-email'
import type { OrderDTO } from '@/features/order/domain/order-entities'
import type { Result } from '@/helpers/result'

const sendPaymentConfirmationEmail = async (
  order: OrderDTO
): Promise<Result> => {
  const items = order.items.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  }))

  return await EmailSender.sendEmail({
    react: createElement(PaymentConfirmationEmail, {
      items,
      orderId: order.id,
      totalPrice: order.totalPrice,
      userName: order.user.email
    }),
    subject: `Confirmation de commande #${order.id.slice(-8)}`,
    to: order.user.email
  })
}

export const PaymentEmailService = {
  sendPaymentConfirmationEmail
}
