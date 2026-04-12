import { Hr, Section, Text } from '@react-email/components'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'

type OrderItem = {
  name: string
  quantity: number
  unitPrice: number
}

type PaymentConfirmationEmailProps = {
  items: OrderItem[]
  orderId: string
  totalPrice: number
  userName: string
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat('fr-FR', {
    currency: 'EUR',
    style: 'currency'
  }).format(price)

export const PaymentConfirmationEmail: React.FC<
  PaymentConfirmationEmailProps
> = ({ items, orderId, totalPrice, userName }) => (
  <EmailLayout preview={`Confirmation de commande #${orderId.slice(-8)}`}>
    <Text style={titleStyle}>Paiement confirmé</Text>
    <Text style={textStyle}>Bonjour {userName},</Text>
    <Text style={textStyle}>
      Votre paiement pour la commande #{orderId.slice(-8)} a bien été reçu.
      Merci pour votre achat !
    </Text>

    <Section style={orderSectionStyle}>
      <Text style={sectionTitleStyle}>Récapitulatif</Text>
      {items.map((item) => (
        <Text key={item.name} style={itemStyle}>
          {item.name} × {item.quantity} —{' '}
          {formatPrice(item.unitPrice * item.quantity)}
        </Text>
      ))}
      <Hr style={hrStyle} />
      <Text style={totalStyle}>Total : {formatPrice(totalPrice)}</Text>
    </Section>
  </EmailLayout>
)

const titleStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '1.4',
  margin: '0 0 16px'
}

const textStyle: React.CSSProperties = {
  color: '#525f7f',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 12px'
}

const orderSectionStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
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
  color: '#525f7f',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 4px'
}

const hrStyle: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '12px 0'
}

const totalStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 700,
  margin: '0'
}
