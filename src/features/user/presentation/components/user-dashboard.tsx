import type { UserDTO } from '@/features/user/domain/user-entities'
import { translateUserRole } from '@/features/user/presentation/utils/role-utils'

type UserDashboardProps = {
  user: UserDTO
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => (
  <div>
    {user.name} - {user.email} - {translateUserRole(user.role)}
  </div>
)
