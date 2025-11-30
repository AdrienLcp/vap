import { ROUTES } from '@/domain/navigation'
import { PaymentMethodList } from '@/features/payment/presentation/components/payment-method-list'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './payment-methods.sass'

export const PaymentMethods: React.FC = () => (
  <div className='payment-methods'>
    <PaymentMethodList />

    <Link href={ROUTES.paymentMethodCreation} variant='filled'>
      {t('payment.method.create.link')}
    </Link>
  </div>
)
