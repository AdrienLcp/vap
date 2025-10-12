import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const UserEmailField: React.FC<Partial<TextFieldProps>> = ({
  label = t('auth.fields.email.label'),
  name = AUTH_FORM_FIELDS.EMAIL,
  placeholder = t('auth.fields.email.placeholder'),
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
