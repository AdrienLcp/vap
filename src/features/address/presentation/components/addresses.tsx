import { ROUTES } from '@/domain/navigation'
import { AddressList } from '@/features/address/presentation/components/address-list'
import { t } from '@/infrastructure/i18n'
import { Link } from '@/presentation/components/ui/pressables/link'

import './addresses.sass'

export const Addresses: React.FC = () => (
  <div className='addresses'>
    <AddressList />

    <Link href={ROUTES.addressCreation} variant='filled'>
      {t('address.create.link')}
    </Link>
  </div>
)
