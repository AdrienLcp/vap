import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailButton,
  EmailHint,
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'
import { t } from '@/infrastructure/i18n'

type VerificationEmailProps = {
  url: string
  userName: string
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({
  url,
  userName
}) => (
  <EmailLayout preview={t('email.templates.verification.preview')}>
    <EmailTitle>{t('email.templates.verification.title')}</EmailTitle>
    <EmailText>
      {t('email.templates.verification.greeting', { userName })}
    </EmailText>
    <EmailText>{t('email.templates.verification.intro')}</EmailText>
    <EmailButton href={url}>
      {t('email.templates.verification.cta')}
    </EmailButton>
    <EmailHint>{t('email.templates.verification.hint')}</EmailHint>
  </EmailLayout>
)
