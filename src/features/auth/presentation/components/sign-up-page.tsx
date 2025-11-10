import { AlreadyRegistered } from '@/features/auth/presentation/components/already-registered'
import { AuthWrapper } from '@/features/auth/presentation/components/auth-wrapper'
import { SignUpForm } from '@/features/auth/presentation/components/forms/sign-up-form'
import { GoogleAuthentication } from '@/features/auth/presentation/components/google-authentication'
import { t } from '@/infrastructure/i18n'

import './sign-up-page.sass'

export const SignUpPage: React.FC = () => (
  <AuthWrapper className='sign-up-page'>
    <h1>{t('auth.signUp.title')}</h1>

    <SignUpForm />

    <AlreadyRegistered />

    <GoogleAuthentication />
  </AuthWrapper>
)
