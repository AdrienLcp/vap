import { EyeIcon, EyeOffIcon, LockIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { AUTH_CONSTANTS, AUTH_FORM_FIELDS } from '@/features/auth/domain/auth-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'
import { Button } from '@/presentation/components/ui/pressables/button'

import './user-password-field.sass'

type EyeIconButtonProps = {
  isPasswordVisible: boolean
  onPress: () => void
}

const EyeIconButton: React.FC<EyeIconButtonProps> = ({ isPasswordVisible, onPress }) => (
  <Button
    className='eye-icon-button'
    onPress={onPress}
    // Icon={<EyeIcon />}
    // variant='transparent'
  >
    {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
  </Button>
)

export const UserPasswordField: React.FC<Partial<TextFieldProps>> = ({
  description = t('auth.fields.password.description', { characterCount: AUTH_CONSTANTS.PASSWORD_MIN_LENGTH }),
  label = t('auth.fields.password.label'),
  name = AUTH_FORM_FIELDS.PASSWORD,
  placeholder = t('auth.fields.password.placeholder'),
  ...userPasswordFieldRestProps
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState)
  }, [])

  // TODO:
  // -> Les icônes n'ont pas la même taille
  // -> L'input s'agrandit quand on écrit trop dedans

  return (
    <TextField
      {...userPasswordFieldRestProps}
      className='user-password-field'
      description={description}
      EndContent={<EyeIconButton isPasswordVisible={isPasswordVisible} onPress={togglePasswordVisibility} />}
      isRequired
      label={label}
      maxLength={AUTH_CONSTANTS.PASSWORD_MAX_LENGTH}
      minLength={AUTH_CONSTANTS.PASSWORD_MIN_LENGTH}
      name={name}
      placeholder={placeholder}
      StartContent={<div className='lock-icon'><LockIcon /></div>}
      type={isPasswordVisible ? 'text' : 'password'}
    />
  )
}
