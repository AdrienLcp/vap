import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const UserNameField: React.FC = () => (
  <TextField
    isRequired
    label={t('auth.signUp.form.name.label')}
    name={AUTH_FORM_FIELDS.NAME}
    placeholder={t('auth.signUp.form.name.placeholder')}
  />
)
