import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { ChangePassword } from '@/auth/components/change-password'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'

const ChangePasswordPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return <ChangePassword />
}

export default ChangePasswordPage
