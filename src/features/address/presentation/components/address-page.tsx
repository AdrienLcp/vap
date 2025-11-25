import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { AddressUpdateForm } from '@/features/address/presentation/components/forms/address-update-form'
import { AddressController } from '@/features/address/presentation/controllers/address-controller'
import { OK_STATUS, UNAUTHORIZED_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './address-page.sass'
import { Link } from '@/presentation/components/ui/pressables/link'

type AddressPageProps = {
  addressId: string
}

export const AddressPage: React.FC<AddressPageProps> = async ({ addressId }) => {
  const addressResponse = await AddressController.findUserAddress(addressId)

  if (addressResponse.status === UNAUTHORIZED_STATUS) {
    redirect(ROUTES.signIn)
  }

  if (addressResponse.status !== OK_STATUS) {
    redirect(ROUTES.notFound)
  }

  return (
    <main className='address-page'>
      <h1>{t('address.update.title')}</h1>

      <AddressUpdateForm address={addressResponse.data} />

      <Link href={ROUTES.addressCreation} variant='filled'>
        {t('address.create.link')}
      </Link>
    </main>
  )
}
