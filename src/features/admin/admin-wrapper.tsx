import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { AdminNav } from '@/features/admin/admin-nav'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './admin-wrapper.sass'

export const AdminWrapper: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const authUserResponse = await AuthController.findUser()

  if (authUserResponse.status !== OK_STATUS) {
    redirect(ROUTES.unauthorized)
  }

  if (!authUserResponse.data.permissions.canAccessAdmin) {
    redirect(ROUTES.forbidden)
  }

  return (
    <main className='admin-main'>
      <AdminNav />

      {children}
    </main>
  )
}
