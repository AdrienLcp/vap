import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { ChangePassword } from '@/auth/components/change-password'
import { ROUTES } from '@/domain/navigation'

const ChangePasswordPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status !== 'ERROR'

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return <ChangePassword />
}

export default ChangePasswordPage
