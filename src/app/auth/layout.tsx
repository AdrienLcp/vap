import { AuthWrapper } from '@/features/auth/presentation/components/auth-wrapper'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AuthWrapper>
    {children}
  </AuthWrapper>
)

export default Layout
