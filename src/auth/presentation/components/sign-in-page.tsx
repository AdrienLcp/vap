import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { SignInForm } from '@/auth/presentation/components/sign-in-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './auth-wrapper.sass'

export const SignInPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return (
    <div className='auth-wrapper'>
      <h1>{t('auth.signIn.title')}</h1>

      <SignInForm />
    </div>
  )
}
