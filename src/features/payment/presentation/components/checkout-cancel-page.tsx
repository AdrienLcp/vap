import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './checkout-cancel-page.sass'

export const CheckoutCancelPage: React.FC = () => (
  <main className='checkout-cancel-page'>
    <h1>{t('checkout.cancel.title')}</h1>
    <p>{t('checkout.cancel.description')}</p>
    <Link href={ROUTES.home} variant='filled'>
      {t('checkout.cancel.backToCart')}
    </Link>
  </main>
)
