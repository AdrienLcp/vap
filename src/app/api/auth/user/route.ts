import { AuthController } from '@/auth/auth-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = () => nextResponse(AuthController.findUser())
