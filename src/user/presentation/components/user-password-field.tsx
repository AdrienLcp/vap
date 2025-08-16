import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const UserPasswordField: React.FC = () => (
  <TextField
    isRequired
    label={t('auth.signUp.form.password.label')}
    name={AUTH_FORM_FIELDS.PASSWORD}
    type='password'
  />
)
