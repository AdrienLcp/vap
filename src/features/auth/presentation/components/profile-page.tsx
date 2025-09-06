import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { ChangeEmailForm } from '@/features/auth/presentation/components/change-email-form'
import { ChangePasswordForm } from '@/features/auth/presentation/components/change-password-form'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './profile-page.sass'

export const ProfilePage: React.FC = async () => {
  const userResponse = await AuthController.findUser()
  const isUserAuthenticated = userResponse.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return (
    <>
      <h1>{t('auth.profile.title')}</h1>

      <section>
        <h2>{t('auth.profile.changeEmail')}</h2>
        <ChangeEmailForm />
      </section>

      <section>
        <h2>{t('auth.profile.changePassword')}</h2>
        <ChangePasswordForm />
      </section>
    </>
  )
}
