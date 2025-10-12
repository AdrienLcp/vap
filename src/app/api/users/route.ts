import type { NextRequest } from 'next/server'

import { UserController } from '@/features/user/presentation/controllers/user-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = async (request: NextRequest) => {
  return nextResponse(UserController.findUsers(request))
}
