import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const UserEmailField: React.FC = () => (
  <TextField
    isRequired
    label={t('auth.signUp.form.email.label')}
    name={AUTH_FORM_FIELDS.EMAIL}
    placeholder={t('auth.signUp.form.email.placeholder')}
    type='email'
  />
)
