import { nextResponse } from '@/api/http-response'
import { AuthController } from '@/auth/auth-controller'

export const GET = () => {
  return nextResponse(AuthController.findUser())
}
