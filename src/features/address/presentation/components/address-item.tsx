import { useCallback, useState } from 'react'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { ToastService } from '@/presentation/services/toast-service'

import './address-item.sass'

type AddressItemProps = {
  address: AddressDTO
}

export const AddressItem: React.FC<AddressItemProps> = ({ address }) => {
  const [isAddressUpdating, setIsAddressUpdating] = useState(false)
  const [isDefaultAddress, setIsDefaultAddress] = useState(address.isDefault)

  const setDefaultAddress = useCallback(async () => {
    setIsAddressUpdating(true)

    const addressUpdateResponse = await AddressClient.setUserDefaultAddress(address.id)

    switch (addressUpdateResponse.status) {
      case OK_STATUS:
        setIsDefaultAddress(true)
        break
      default:
        ToastService.error(t('address.card.updateDefaultAddressError'))
    }

    setIsAddressUpdating(false)
  }, [address.id])

  return <div className='address-item'></div>
}
