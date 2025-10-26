import { AdminWrapper } from '@/features/admin/admin-wrapper'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AdminWrapper>{children}</AdminWrapper>
)

export default Layout
