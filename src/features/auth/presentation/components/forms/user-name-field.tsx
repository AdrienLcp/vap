import { UserIcon } from 'lucide-react'

import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

import './user-name-field.sass'

export const UserNameField: React.FC<Partial<TextFieldProps>> = ({
  label = t('auth.fields.name.label'),
  name = AUTH_FORM_FIELDS.NAME,
  placeholder = t('auth.fields.name.placeholder'),
  ...userNameFieldRestProps
}) => (
  <TextField
    className='user-name-field'
    isRequired
    label={label}
    name={name}
    placeholder={placeholder}
    StartContent={<UserIcon aria-hidden className='user-icon' />}
    {...userNameFieldRestProps}
  />
)
