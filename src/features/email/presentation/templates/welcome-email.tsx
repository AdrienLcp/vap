import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailButton,
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'
import { t } from '@/infrastructure/i18n'

type WelcomeEmailProps = {
  appUrl: string
  userName: string
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  appUrl,
  userName
}) => (
  <EmailLayout preview={t('email.templates.welcome.preview', { userName })}>
    <EmailTitle>{t('email.templates.welcome.title', { userName })}</EmailTitle>
    <EmailText>{t('email.templates.welcome.intro')}</EmailText>
    <EmailText>{t('email.templates.welcome.secondary')}</EmailText>
    <EmailButton href={appUrl}>{t('email.templates.welcome.cta')}</EmailButton>
  </EmailLayout>
)
