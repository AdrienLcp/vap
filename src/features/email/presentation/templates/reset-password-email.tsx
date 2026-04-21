import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailButton,
  EmailHint,
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'
import { t } from '@/infrastructure/i18n'

type ResetPasswordEmailProps = {
  url: string
  userName: string
}

export const ResetPasswordEmail: React.FC<ResetPasswordEmailProps> = ({
  url,
  userName
}) => (
  <EmailLayout preview={t('email.templates.resetPassword.preview')}>
    <EmailTitle>{t('email.templates.resetPassword.title')}</EmailTitle>
    <EmailText>
      {t('email.templates.resetPassword.greeting', { userName })}
    </EmailText>
    <EmailText>{t('email.templates.resetPassword.intro')}</EmailText>
    <EmailButton href={url}>
      {t('email.templates.resetPassword.cta')}
    </EmailButton>
    <EmailHint>{t('email.templates.resetPassword.hint')}</EmailHint>
  </EmailLayout>
)
