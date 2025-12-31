import { MailIcon } from 'lucide-react'

import { AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import {
  TextField,
  type TextFieldProps
} from '@/presentation/components/forms/text-field'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './user-email-field.sass'

export const UserEmailField: React.FC<Partial<TextFieldProps>> = ({
  autoComplete = 'email',
  className,
  isRequired = true,
  label = t('auth.fields.email.label'),
  name = AUTH_FORM_FIELDS.EMAIL,
  placeholder = t('auth.fields.email.placeholder'),
  StartContent = <MailIcon className='mail-icon' />,
  type = 'email',
  ...userEmailFieldRestProps
}) => (
  <TextField
    {...userEmailFieldRestProps}
    autoComplete={autoComplete}
    className={(values) =>
      reactAriaClassNames(values, className, 'user-email-field')
    }
    isRequired={isRequired}
    label={label}
    name={name}
    placeholder={placeholder}
    StartContent={StartContent}
    type={type}
  />
)
