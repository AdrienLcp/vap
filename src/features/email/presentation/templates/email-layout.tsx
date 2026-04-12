import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text
} from '@react-email/components'

type EmailLayoutProps = {
  children: React.ReactNode
  preview: string
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  children,
  preview
}) => (
  <Html>
    <Head />
    <Preview>{preview}</Preview>
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Text style={headerStyle}>VAP</Text>
        {children}
        <Hr style={hrStyle} />
        <Text style={footerStyle}>VAP — Votre boutique en ligne</Text>
      </Container>
    </Body>
  </Html>
)

const bodyStyle: React.CSSProperties = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif'
}

const containerStyle: React.CSSProperties = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  borderRadius: '8px',
  margin: '40px auto',
  maxWidth: '560px',
  padding: '32px'
}

const headerStyle: React.CSSProperties = {
  fontSize: '24px',
  fontWeight: 700,
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  margin: '0 0 24px'
}

const hrStyle: React.CSSProperties = {
  borderColor: '#e6ebf1',
  margin: '24px 0'
}

const footerStyle: React.CSSProperties = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px'
}
