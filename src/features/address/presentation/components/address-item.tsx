import { useCallback } from 'react'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressCard } from '@/features/address/presentation/components/address-card'
import { NO_CONTENT_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { ToastService } from '@/presentation/services/toast-service'

type AddressItemProps = {
  address: AddressDTO
  isUpdatingAddresses: boolean
  setAddresses: React.Dispatch<React.SetStateAction<AddressDTO[]>>
  setIsUpdatingAddresses: (isLoading: boolean) => void
}

export const AddressItem: React.FC<AddressItemProps> = ({
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

  const deleteAddress = useCallback(async () => {
    setIsUpdatingAddresses(true)

    const addressDeleteResponse = await AddressClient.deleteUserAddress(address.id)

    switch (addressDeleteResponse.status) {
      case NO_CONTENT_STATUS:
        setAddresses((previousAddresses) => previousAddresses.filter((a) => a.id !== address.id))
        break
      default:
        ToastService.error(t('address.card.deleteAddressError'))
    }

    setIsUpdatingAddresses(false)
  }, [address.id, setAddresses, setIsUpdatingAddresses])

  return (
    <AddressCard
      address={address}
      deleteAddress={deleteAddress}
      isLoading={isUpdatingAddresses}
      setDefaultAddress={setDefaultAddress}
    />
  )
}
