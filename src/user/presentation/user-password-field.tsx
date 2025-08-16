import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const UserPasswordField: React.FC = () => (
  <TextField
    description={t('auth.signUp.form.password.description', { characterCount: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH })}
    isRequired
    label={t('auth.signUp.form.password.label')}
    maxLength={AUTH_CONSTANTS.PASSWORD_MAX_LENGTH}
    minLength={AUTH_CONSTANTS.PASSWORD_MIN_LENGTH}
    name={AUTH_FORM_FIELDS.PASSWORD}
    placeholder={t('auth.signUp.form.password.placeholder')}
    type='password'
  />
)
