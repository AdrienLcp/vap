import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { ChangeEmail } from '@/auth/presentation/components/change-email'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'

const ChangeEmailPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return <ChangeEmail />
}

export default ChangeEmailPage
