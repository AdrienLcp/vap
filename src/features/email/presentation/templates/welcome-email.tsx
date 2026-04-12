import { Link, Text } from '@react-email/components'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'

type WelcomeEmailProps = {
  appUrl: string
  userName: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appUrl,
  userName
}) => (
  <EmailLayout preview={`Bienvenue sur VAP, ${userName} !`}>
    <Text style={titleStyle}>Bienvenue, {userName} !</Text>
    <Text style={textStyle}>
      Merci de vous être inscrit sur VAP. Votre compte est prêt.
    </Text>
    <Text style={textStyle}>
      Découvrez nos produits et commencez vos achats dès maintenant.
    </Text>
    <Link href={appUrl} style={linkStyle}>
      Parcourir la boutique
    </Link>
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

const linkStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  borderRadius: '6px',
  color: '#ffffff',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 24px',
  textDecoration: 'none'
}
