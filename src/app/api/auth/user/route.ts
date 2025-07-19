import { nextResponse } from '@/api/server'
import { AuthController } from '@/auth/auth-controller'

export const POST = () => {
  return nextResponse(AuthController.findUser())
}
