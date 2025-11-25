import { useCallback } from 'react'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Switch } from '@/presentation/components/forms/switch'
import { ToastService } from '@/presentation/services/toast-service'

import './address-card.sass'

type AddressCardProps = {
  address: AddressDTO
  isUpdatingAddresses?: boolean
  setAddresses: (newAddressList: AddressDTO[]) => void
  setIsUpdatingAddresses: (isLoading: boolean) => void
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  isUpdatingAddresses,
  setAddresses,
  setIsUpdatingAddresses
}) => {
  const setDefaultAddress = useCallback(async () => {
    setIsUpdatingAddresses(true)

    const addressUpdateResponse = await AddressClient.setUserDefaultAddress(address.id)

    switch (addressUpdateResponse.status) {
      case OK_STATUS:
        setAddresses(addressUpdateResponse.data)
        break
      default:
        ToastService.error(t('address.card.updateDefaultAddressError'))
    }

    setIsUpdatingAddresses(false)
  }, [address.id, setAddresses, setIsUpdatingAddresses])

  return (
    <div className='address-card'>
      <div className='address-card__details'>
        {address.street}, {address.postalCode}, {address.city}, {address.country}
      </div>

      <Switch
        isDisabled={isUpdatingAddresses}
        isReadOnly={address.isDefault}
        isSelected={address.isDefault}
        label={t('address.card.makeDefault')}
        onChange={setDefaultAddress}
      />
    </div>
  )
}
