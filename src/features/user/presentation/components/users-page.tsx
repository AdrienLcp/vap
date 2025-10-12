import { UserList } from '@/features/user/presentation/components/user-list'
import { UserController } from '@/features/user/presentation/controllers/user-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'

export const UsersPage: React.FC = async () => {
  const usersResponse = await UserController.findUsers()

  if (usersResponse.status !== OK_STATUS) {
    return null
  }

  return <UserList users={usersResponse.data} />
}
