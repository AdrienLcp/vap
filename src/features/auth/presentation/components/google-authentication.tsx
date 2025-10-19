'use client'

import { useCallback, useState } from 'react'

import { AuthClient } from '@/features/auth/infrastructure/auth-client'
import { t } from '@/infrastructure/i18n'
import { GoogleIcon } from '@/presentation/assets/icons/GoogleIcon'
import { Button } from '@/presentation/components/ui/pressables/button'

import './google-authentication.sass'

export const GoogleAuthentication: React.FC = () => {
  const [isLoginWithGoogleLoading, setIsLoginWithGoogleLoading] = useState(false)

  const loginWithGoogle = useCallback(async () => {
    setIsLoginWithGoogleLoading(true)
    await AuthClient.socialSignIn('google')
  }, [])

  return (
    <Button
      className='google-authentication-button'
      Icon={<GoogleIcon />}
      isPending={isLoginWithGoogleLoading}
      onPress={loginWithGoogle}
      variant='outlined'
    >
      {t('auth.social.google')}
    </Button>
  )
}
