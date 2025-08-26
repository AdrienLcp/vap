import { AUTH_FORM_FIELDS } from '@/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const UserNameField: React.FC<Partial<TextFieldProps>> = ({
  label = t('auth.fields.name.label'),
  name = AUTH_FORM_FIELDS.NAME,
  placeholder = t('auth.fields.name.placeholder'),
  ...userNameFieldRestProps
}) => (
  <TextField
    {...userNameFieldRestProps}
    isRequired
    label={label}
    name={name}
    placeholder={placeholder}
  />
)
