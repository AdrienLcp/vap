import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { SignUpForm } from '@/auth/components/sign-up-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'

const SignUpPage: React.FC = async () => {
  const authUserResult = await AuthController.findUser()
  const isUserAuthenticated = authUserResult.status !== 'ERROR'

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return <SignUpForm />
}

export default SignUpPage
