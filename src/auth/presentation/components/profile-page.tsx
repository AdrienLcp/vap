import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { ChangeEmailForm } from '@/auth/presentation/components/change-email-form'
import { ChangePasswordForm } from '@/auth/presentation/components/change-password-form'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './auth-wrapper.sass'

export const ProfilePage: React.FC = async () => {
  const userResponse = await AuthController.findUser()
  const isUserAuthenticated = userResponse.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return (
    <div className='auth-wrapper'>
      <h1>{t('auth.profile.title')}</h1>

      <section>
        <h2>{t('auth.profile.changeEmail')}</h2>
        <ChangeEmailForm />
      </section>

      <section>
        <h2>{t('auth.profile.changePassword')}</h2>
        <ChangePasswordForm />
      </section>
    </div>
  )
}
