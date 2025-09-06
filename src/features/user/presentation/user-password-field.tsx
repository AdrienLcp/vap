import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const UserPasswordField: React.FC<Partial<TextFieldProps>> = ({
  description = t('auth.fields.password.description', { characterCount: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH }),
  label = t('auth.fields.password.label'),
  name = AUTH_FORM_FIELDS.PASSWORD,
  placeholder = t('auth.fields.password.placeholder'),
  ...userPasswordFieldRestProps
}) => (
  <TextField
    {...userPasswordFieldRestProps}
    description={description}
    isRequired
    label={label}
    maxLength={AUTH_CONSTANTS.PASSWORD_MAX_LENGTH}
    minLength={AUTH_CONSTANTS.PASSWORD_MIN_LENGTH}
    name={name}
    placeholder={placeholder}
    type='password'
  />
)
