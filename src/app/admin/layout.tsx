import { AdminWrapper } from '@/features/admin/admin-wrapper'

export const dynamic = 'force-dynamic'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AdminWrapper>{children}</AdminWrapper>
)

export default Layout
