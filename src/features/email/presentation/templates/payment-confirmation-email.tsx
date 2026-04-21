import { Hr, Section, Text } from 'react-email'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'
import { emailColors } from '@/features/email/presentation/templates/email-styles'
import { t } from '@/infrastructure/i18n'

type OrderItem = {
  name: string
  quantity: number
  unitPrice: number
}

type PaymentConfirmationEmailProps = {
  items: OrderItem[]
  orderId: string
  shippingCost: number
  totalPrice: number
  userName: string
}

export const PaymentConfirmationEmail: React.FC<
  PaymentConfirmationEmailProps
> = ({ items, orderId, shippingCost, totalPrice, userName }) => {
  const orderSuffix = orderId.slice(-8)

  return (
    <EmailLayout
      preview={t('email.templates.paymentConfirmation.preview', {
        orderSuffix
      })}
    >
      <EmailTitle>{t('email.templates.paymentConfirmation.title')}</EmailTitle>
      <EmailText>
        {t('email.templates.paymentConfirmation.greeting', { userName })}
      </EmailText>
      <EmailText>
        {t('email.templates.paymentConfirmation.intro', { orderSuffix })}
      </EmailText>

      <Section style={orderSectionStyle}>
        <Text style={sectionTitleStyle}>
          {t('email.templates.paymentConfirmation.summary')}
        </Text>
        {items.map((item) => (
          <Text key={item.name} style={itemStyle}>
            {t('email.templates.paymentConfirmation.item', {
              name: item.name,
              price: item.unitPrice * item.quantity,
              quantity: item.quantity
            })}
          </Text>
        ))}
        <Text style={itemStyle}>
          {shippingCost === 0
            ? t('email.templates.paymentConfirmation.shippingFree')
            : t('email.templates.paymentConfirmation.shipping', {
                shipping: shippingCost
              })}
        </Text>
        <Hr style={innerHrStyle} />
        <Text style={totalStyle}>
          {t('email.templates.paymentConfirmation.total', {
            total: totalPrice
          })}
        </Text>
      </Section>
    </EmailLayout>
  )
}

const orderSectionStyle: React.CSSProperties = {
  backgroundColor: emailColors.background,
  borderRadius: '6px',
  marginTop: '16px',
  padding: '16px'
}

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 600,
  margin: '0 0 12px',
  textTransform: 'uppercase' as const
}

const itemStyle: React.CSSProperties = {
  color: emailColors.text,
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 4px'
}

const totalStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 700,
  margin: '0'
}

const innerHrStyle: React.CSSProperties = {
  borderColor: emailColors.borderSoft,
  margin: '12px 0'
}
