import { Body, Container, Head, Hr, Html, Preview, Text } from 'react-email'

import {
  bodyStyle,
  containerStyle,
  footerStyle,
  headerStyle,
  hrStyle
} from '@/features/email/presentation/templates/email-styles'
import { t } from '@/infrastructure/i18n'

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
        <Text style={headerStyle}>{t('appName')}</Text>
        {children}
        <Hr style={hrStyle} />
        <Text style={footerStyle}>{t('email.layout.footer')}</Text>
      </Container>
    </Body>
  </Html>
)
