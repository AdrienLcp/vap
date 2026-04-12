import { Link, Text } from '@react-email/components'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'

type ResetPasswordEmailProps = {
  url: string
  userName: string
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  url,
  userName
}) => (
  <EmailLayout preview='Réinitialisation de votre mot de passe'>
    <Text style={titleStyle}>Réinitialisation du mot de passe</Text>
    <Text style={textStyle}>Bonjour {userName},</Text>
    <Text style={textStyle}>
      Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur
      le lien ci-dessous pour en choisir un nouveau.
    </Text>
    <Link href={url} style={linkStyle}>
      Réinitialiser mon mot de passe
    </Link>
    <Text style={hintStyle}>
      Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.
    </Text>
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

const hintStyle: React.CSSProperties = {
  color: '#8898aa',
  fontSize: '13px',
  lineHeight: '1.5',
  marginTop: '16px'
}
