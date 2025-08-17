'use server'

import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { AlreadyRegistered } from '@/auth/presentation/components/already-registered'
import { SignUpForm } from '@/auth/presentation/components/sign-up-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

export const SignUpPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return (
    <>
      <h1>{t('auth.signUp.title')}</h1>

      <SignUpForm />

      <AlreadyRegistered />
    </>
  )
}
