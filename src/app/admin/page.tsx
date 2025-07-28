import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { ROUTES } from '@/domain/navigation'

const AdminPage: React.FC = async () => {
  const authUserResult = await AuthController.findUser()

  if (authUserResult.status !== 'SUCCESS') {
    redirect(ROUTES.unauthorized)
  }

  if (!authUserResult.data.permissions.canAccessAdmin) {
    redirect(ROUTES.forbidden)
  }

  return (
    <>Admin</>
  )
}

export default AdminPage
