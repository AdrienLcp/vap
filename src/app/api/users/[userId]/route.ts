import type { NextRequest } from 'next/server'

import { UserController } from '@/features/user/presentation/controllers/user-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

type UserRouteContext = RouteContext<'/api/users/[userId]'>

export const PATCH = async (request: NextRequest, context: UserRouteContext) => {
  const { userId } = await context.params
  return nextResponse(UserController.updateUserRole(userId, request))
}
