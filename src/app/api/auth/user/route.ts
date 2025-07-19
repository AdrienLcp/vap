import { nextResponse } from '@/api/server'
import { AuthController } from '@/auth/auth-controller'

export const GET = () => {
  return nextResponse(AuthController.findUser())
}
