import { redirect } from 'next/navigation'

import { DEFAULT_ROUTE } from '@/domain/navigation'
import { SignInForm } from '@/features/auth/presentation/components/forms/sign-in-form'
import { GoogleAuthentication } from '@/features/auth/presentation/components/google-authentication'
import { NoAccount } from '@/features/auth/presentation/components/no-account'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

export const SignInPage: React.FC = async () => {
  const userResponse = await AuthController.findUser()
  const isUserAuthenticated = userResponse.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return (
    <>
      <h1>{t('auth.signIn.title')}</h1>

      <SignInForm />

      <NoAccount />

      <GoogleAuthentication />
    </>
  )
}
