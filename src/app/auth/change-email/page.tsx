import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { ChangeEmail } from '@/auth/components/change-email'
import { ROUTES } from '@/domain/navigation'

const ChangeEmailPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status !== 'ERROR'

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return <ChangeEmail />
}

export default ChangeEmailPage
