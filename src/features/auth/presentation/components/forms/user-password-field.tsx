import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'

import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'
import { Button } from '@/presentation/components/ui/pressables/button'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './user-password-field.sass'

type EyeIconButtonProps = {
  isSlashed: boolean
  onPress: () => void
}

const EyeIconButton: React.FC<EyeIconButtonProps> = ({ isSlashed, onPress }) => (
  <Button
    className='eye-icon-button'
    Icon={isSlashed ? <EyeOffIcon aria-hidden /> : <EyeIcon aria-hidden />}
    onPress={onPress}
    variant='transparent'
  />
)

export const UserPasswordField: React.FC<Partial<TextFieldProps>> = ({
  className,
  description = t('auth.fields.password.description', {
    characterCount: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH
  }),
  isRequired = true,
  label = t('auth.fields.password.label'),
  name = AUTH_FORM_FIELDS.PASSWORD,
  placeholder = t('auth.fields.password.placeholder'),
  StartContent = <LockIcon aria-hidden className='lock-icon' />,
  ...userPasswordFieldRestProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible((previousPasswordVisibilityState) => !previousPasswordVisibilityState)
  }, [])

  const UserPasswordFieldEndContent = useMemo(() => {
    return <EyeIconButton isSlashed={isPasswordVisible} onPress={togglePasswordVisibility} />
  }, [isPasswordVisible, togglePasswordVisibility])

  return (
    <TextField
      className={(values) => reactAriaClassNames(values, className, 'user-password-field')}
      description={description}
      EndContent={UserPasswordFieldEndContent}
      isRequired={isRequired}
      label={label}
      maxLength={AUTH_CONSTANTS.PASSWORD_MAX_LENGTH}
      minLength={AUTH_CONSTANTS.PASSWORD_MIN_LENGTH}
      name={name}
      placeholder={placeholder}
      StartContent={StartContent}
      type={isPasswordVisible ? 'text' : 'password'}
      {...userPasswordFieldRestProps}
    />
  )
}
