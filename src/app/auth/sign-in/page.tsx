import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { SignInForm } from '@/auth/presentation/components/sign-in-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'

const SignInPage: React.FC = async () => {
  const authUserResponse = await AuthController.findUser()
  const isUserAuthenticated = authUserResponse.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return <SignInForm />
}

export default SignInPage
