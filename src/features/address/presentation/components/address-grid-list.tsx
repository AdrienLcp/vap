import { useState } from 'react'
import { GridList, GridListItem } from 'react-aria-components'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressCard } from '@/features/address/presentation/components/address-card'
import { t } from '@/infrastructure/i18n'

type AddressGridListProps = {
  addresses: AddressDTO[]
  setAddresses: React.Dispatch<React.SetStateAction<AddressDTO[]>>
}

const renderEmptyState = () => <p className='empty-message'>{t('address.list.empty')}</p>

export const AddressGridList: React.FC<AddressGridListProps> = ({ addresses, setAddresses }) => {
  const [isUpdatingAddresses, setIsUpdatingAddresses] = useState(false)

  const addressListItems = addresses.map((address) => ({
    ...address,
    textValue: `${address.street}, ${address.postalCode}, ${address.city}, ${address.country}${address.isDefault ? ` (${t('address.card.isDefault')})` : ''}`
  }))

  return (
    <GridList
      aria-label={t('address.list.ariaLabel')}
      className='address-list'
      items={addressListItems}
      renderEmptyState={renderEmptyState}
    >
      {(address) => (
        <GridListItem textValue={address.textValue}>
          <AddressCard
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
