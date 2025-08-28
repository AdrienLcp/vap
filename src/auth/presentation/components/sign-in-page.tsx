import { redirect } from 'next/navigation'

import { NoAccount } from '@/auth/presentation/components/no-account'
import { SignInForm } from '@/auth/presentation/components/sign-in-form'
import { AuthController } from '@/auth/presentation/controllers/auth-controller'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

export const SignInPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return (
    <>
      <h1>{t('auth.signIn.title')}</h1>

      <SignInForm />

      <NoAccount />
    </>
  )
}
