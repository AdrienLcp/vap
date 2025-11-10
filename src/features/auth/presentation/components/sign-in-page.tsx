import { AuthWrapper } from '@/features/auth/presentation/components/auth-wrapper'
import { SignInForm } from '@/features/auth/presentation/components/forms/sign-in-form'
import { GoogleAuthentication } from '@/features/auth/presentation/components/google-authentication'
import { NoAccount } from '@/features/auth/presentation/components/no-account'
import { t } from '@/infrastructure/i18n'

import './sign-in-page.sass'

export const SignInPage: React.FC = () => (
  <AuthWrapper className='sign-in-page'>
    <h1>{t('auth.signIn.title')}</h1>

    <SignInForm />

    <NoAccount />

    <GoogleAuthentication />
  </AuthWrapper>
)
