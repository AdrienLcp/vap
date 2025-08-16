'use server'

import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { SignUpForm } from '@/auth/presentation/components/sign-up-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './sign-up-page.sass'

export const SignUpPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return (
    <div className='sign-up'>
      <h1>{t('auth.signUp.title')}</h1>

      <SignUpForm />
    </div>
  )
}
