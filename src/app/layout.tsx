import { RootLayout } from '@/presentation/components/root-layout'

const Layout: React.FC<React.PropsWithChildren> = async ({ children }) => (
  <RootLayout>{children}</RootLayout>
)

export default Layout
