import 'server-only'

import { EmailSender } from '@/features/email/infrastructure/email-sender'
import { PaymentConfirmationEmail } from '@/features/email/presentation/templates/payment-confirmation-email'
import type { OrderDTO } from '@/features/order/domain/order-entities'
import type { Result } from '@/helpers/result'
import { t } from '@/infrastructure/i18n'

const sendPaymentConfirmationEmail = async (
  order: OrderDTO
): Promise<Result> => {
  const items = order.items.map((item) => ({
    name: item.product.name,
    quantity: item.quantity,
    unitPrice: item.unitPrice
  }))

  return await EmailSender.sendEmail({
    props: {
      items,
      orderId: order.id,
      totalPrice: order.totalPrice,
      userName: order.user.email
    },
    subject: t('email.templates.paymentConfirmation.subject', {
      orderSuffix: order.id.slice(-8)
    }),
    template: PaymentConfirmationEmail,
    to: order.user.email
  })
}

export const PaymentEmailService = {
  sendPaymentConfirmationEmail
}
