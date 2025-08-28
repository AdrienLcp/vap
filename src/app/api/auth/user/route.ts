import { AuthController } from '@/auth/presentation/controllers/auth-controller'
import { nextResponse } from '@/infrastructure/api/api-lib'

export const GET = () => nextResponse(AuthController.findUser())
