'use client'

import { useState } from 'react'
import { GridList, GridListItem } from 'react-aria-components'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressItem } from '@/features/address/presentation/components/address-item'
import { t } from '@/infrastructure/i18n'

import './address-grid-list.sass'

const joinNonEmpty = (parts: (string | undefined)[], separator = ' ') => {
  return parts.filter((p) => p && p.trim().length > 0).join(separator)
}

const buildAddressTextValue = (address: AddressDTO): string => {
  const baseAddressTextValue = joinNonEmpty([
    address.name,
    address.street,
    address.postalCode,
    address.city,
    address.country
  ])

  if (address.isDefault) {
    return `${baseAddressTextValue} (${t('address.card.isDefault')})`
  }

  return baseAddressTextValue
}

type AddressGridListProps = {
  addresses: AddressDTO[]
  setAddresses: React.Dispatch<React.SetStateAction<AddressDTO[]>>
}

const renderAddressGridListEmptyState = () => (
  <p className='empty-message'>{t('address.list.empty')}</p>
)

export const AddressGridList: React.FC<AddressGridListProps> = ({ addresses, setAddresses }) => {
  const [isUpdatingAddresses, setIsUpdatingAddresses] = useState(false)

  const addressListItems = addresses.map((address) => ({
    ...address,
    textValue: buildAddressTextValue(address)
  }))

  return (
    <GridList
      aria-label={t('address.list.ariaLabel')}
      className='address-list'
      items={addressListItems}
      renderEmptyState={renderAddressGridListEmptyState}
    >
      {(address) => (
        <GridListItem textValue={address.textValue}>
          <AddressItem
            address={address}
            isUpdatingAddresses={isUpdatingAddresses}
            setAddresses={setAddresses}
            setIsUpdatingAddresses={setIsUpdatingAddresses}
          />
        </GridListItem>
      )}
    </GridList>
  )
}
