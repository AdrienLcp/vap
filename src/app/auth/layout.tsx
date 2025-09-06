import { AuthWrapper } from '@/features/auth/presentation/components/auth-wrapper'

const AuthLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthWrapper>
    {children}
  </AuthWrapper>
)

export default AuthLayout
