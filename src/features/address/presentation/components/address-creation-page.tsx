import { redirect } from 'next/navigation'

import { ROUTES } from '@/domain/navigation'
import { AddressCreationForm } from '@/features/address/presentation/components/forms/address-creation-form'
import { AuthController } from '@/features/auth/presentation/controllers/auth-controller'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'

import './address-creation-page.sass'

export const AddressCreationPage: React.FC = async () => {
  const authUserResponse = await AuthController.findUser()
  const isUserAuthenticated = authUserResponse.status === OK_STATUS

  if (!isUserAuthenticated) {
    redirect(ROUTES.unauthorized)
  }

  return (
    <main className='address-creation-page'>
      <h1>{t('address.create.title')}</h1>

      <AddressCreationForm />
    </main>
  )
}
