import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { UserDashboard } from '@/features/user/presentation/components/user-dashboard'
import { UserController } from '@/features/user/presentation/controllers/user-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

type UserPageProps = {
  userId: string
}

export const UserPage: React.FC<UserPageProps> = async ({ userId }) => {
  const userResponse = await UserController.findUser(userId)

  if (userResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return <UserDashboard user={userResponse.data} />
}
