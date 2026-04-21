import { EmailLayout } from '@/features/email/presentation/templates/email-layout'
import {
  EmailButton,
  EmailHint,
  EmailText,
  EmailTitle
} from '@/features/email/presentation/templates/email-primitives'
import { t } from '@/infrastructure/i18n'

type AccountDeletionEmailProps = {
  url: string
  userName: string
}

export const AccountDeletionEmail: React.FC<AccountDeletionEmailProps> = ({
  url,
  userName
}) => (
  <EmailLayout preview={t('email.templates.accountDeletion.preview')}>
    <EmailTitle>{t('email.templates.accountDeletion.title')}</EmailTitle>
    <EmailText>
      {t('email.templates.accountDeletion.greeting', { userName })}
    </EmailText>
    <EmailText>{t('email.templates.accountDeletion.intro')}</EmailText>
    <EmailButton href={url} variant='danger'>
      {t('email.templates.accountDeletion.cta')}
    </EmailButton>
    <EmailHint>{t('email.templates.accountDeletion.hint')}</EmailHint>
  </EmailLayout>
)
