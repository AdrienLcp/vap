import { redirect } from 'next/navigation'

import { AuthController } from '@/auth/auth-controller'
import { SignInForm } from '@/auth/components/sign-in-form'
import { DEFAULT_ROUTE } from '@/domain/navigation'

const SignInPage: React.FC = async () => {
  const authUserResult = await AuthController.findUser()
  const isUserAuthenticated = authUserResult.status !== 'ERROR'

  if (isUserAuthenticated) {
    redirect(DEFAULT_ROUTE)
  }

  return <SignInForm />
}

export default SignInPage
