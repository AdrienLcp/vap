import { AdminWrapper } from '@/admin/admin-wrapper'

const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <AdminWrapper>
    {children}
  </AdminWrapper>
)

export default AdminLayout
