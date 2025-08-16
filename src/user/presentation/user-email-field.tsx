import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const UserEmailField: React.FC<Partial<TextFieldProps>> = ({
  label = t('auth.signUp.form.email.label'),
  name = AUTH_FORM_FIELDS.EMAIL,
  placeholder = t('auth.signUp.form.email.placeholder'),
  ...userEmailFieldRestProps
}) => (
  <TextField
    {...userEmailFieldRestProps}
    isRequired
    label={label}
    name={name}
    placeholder={placeholder}
    type='email'
  />
)
