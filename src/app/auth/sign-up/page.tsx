import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/presentation/auth-controller'
import { SignUpForm } from '@/auth/presentation/components/sign-up-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'
import { OK_STATUS } from '@/infrastructure/api/http-response'

const SignUpPage: React.FC = async () => {
  const authUserResult = await AuthController.findUser()
  const isUserAuthenticated = authUserResult.status === OK_STATUS

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return <SignUpForm />
}

export default SignUpPage
