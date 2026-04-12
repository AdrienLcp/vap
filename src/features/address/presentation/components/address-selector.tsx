'use client'

import { MapPinPlusIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import type { Key } from 'react-aria-components'

import { ROUTES } from '@/domain/navigation'
import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import type { SelectItem } from '@/presentation/components/forms/select'
import { Select } from '@/presentation/components/forms/select'
import { Link } from '@/presentation/components/ui/pressables/link'

import './address-selector.sass'

type AddressSelectorProps = {
  onAddressChange: (addressId: string) => void
  selectedAddressId: string
}

const toSelectItem = (address: AddressDTO): SelectItem => ({
  id: address.id,
  textValue: `${address.name} — ${address.street}, ${address.postalCode} ${address.city}`
})

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  onAddressChange,
  selectedAddressId
}) => {
  const [addresses, setAddresses] = useState<AddressDTO[]>([])

  useEffect(() => {
    const loadAddresses = async () => {
      const response = await AddressClient.findUserAddresses()

      if (response.status !== OK_STATUS) {
        return
      }

      setAddresses(response.data)

      const defaultAddress = response.data.find((address) => address.isDefault)
      const initialAddress = defaultAddress ?? response.data[0]

      if (initialAddress) {
        onAddressChange(initialAddress.id)
      }
    }

    loadAddresses()
  }, [onAddressChange])

  const onSelectAddress = useCallback(
    (addressId: Key | null) => {
      if (addressId != null) {
        onAddressChange(String(addressId))
      }
    },
    [onAddressChange]
  )

  return (
    <div className='address-selector'>
      {addresses.length === 0 ? (
        <p className='no-address'>{t('checkout.noAddress')}</p>
      ) : (
        <Select
          items={addresses.map(toSelectItem)}
          label={t('checkout.selectAddress')}
          onChange={onSelectAddress}
          value={selectedAddressId}
        />
      )}

      <Link
        href={ROUTES.addressCreation}
        Icon={<MapPinPlusIcon aria-hidden />}
        variant='underlined'
      >
        {t('checkout.addAddress')}
      </Link>
    </div>
  )
}
