import { nextResponse } from '@/infrastructure/api/api-lib'
import { AuthController } from '@/auth/auth-controller'

export const GET = () => nextResponse(AuthController.findUser())
