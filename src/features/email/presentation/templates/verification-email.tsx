import { Link, Text } from '@react-email/components'

import { EmailLayout } from '@/features/email/presentation/templates/email-layout'

type VerificationEmailProps = {
  url: string
  userName: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  url,
  userName
}) => (
  <EmailLayout preview='Vérifiez votre adresse email'>
    <Text style={titleStyle}>Vérification de votre email</Text>
    <Text style={textStyle}>Bonjour {userName},</Text>
    <Text style={textStyle}>
      Cliquez sur le lien ci-dessous pour vérifier votre adresse email.
    </Text>
    <Link href={url} style={linkStyle}>
      Vérifier mon email
    </Link>
    <Text style={hintStyle}>
      Si vous n'avez pas créé de compte, vous pouvez ignorer cet email.
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
