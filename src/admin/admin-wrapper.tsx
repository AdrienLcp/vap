import { redirect } from 'next/navigation'

import { AdminNav } from '@/admin/admin-nav'
import { AuthController } from '@/auth/presentation/auth-controller'
import { ROUTES } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'

import './admin-wrapper.sass'

export const AdminWrapper: React.FC<React.PropsWithChildren> = async ({ children }) => {
  const authUserResult = await AuthController.findUser()

  if (authUserResult.status !== OK_STATUS) {
    redirect(ROUTES.unauthorized)
  }

  if (!authUserResult.data.permissions.canAccessAdmin) {
    redirect(ROUTES.forbidden)
  }

  return (
    <>
      <main className='admin-main'>
        <AdminNav />

        {children}
      </main>
    </>
  )
}
