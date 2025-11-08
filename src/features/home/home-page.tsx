import { PublicProductsDashboard } from '@/features/product/presentation/components/public-products-dashboard'

import './home-page.sass'

export const HomePage: React.FC = async () => (
  <main className='home-main'>
    <PublicProductsDashboard />
  </main>
)
