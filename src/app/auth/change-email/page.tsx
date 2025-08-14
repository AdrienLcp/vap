import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { ChangeEmail } from '@/auth/presentation/components/change-email'
import { ROUTES } from '@/domain/navigation'

const ChangeEmailPage: React.FC = async () => {
  const userResult = await AuthController.findUser()
  const isUserAuthenticated = userResult.status === 200

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return <ChangeEmail />
}

export default ChangeEmailPage
