import { nextResponse } from '@/api/api-lib'
import { AuthController } from '@/auth/auth-controller'

export const GET = () => {
  return nextResponse(AuthController.findUser())
}
