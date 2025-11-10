import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { AuthWrapper } from '@/features/auth/presentation/components/auth-wrapper'
import { ProfileDashboard } from '@/features/auth/presentation/components/profile-dashboard'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

export const ProfilePage: React.FC = async () => {
  const userResponse = await AuthController.findUser()
  const isUserAuthenticated = userResponse.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return (
    <AuthWrapper>
      <h1>{t('auth.profile.title')}</h1>

      <ProfileDashboard />
    </AuthWrapper>
  )
}
