import { ListBox, ListBoxItem } from 'react-aria-components'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { t } from '@/infrastructure/i18n'

import './address-list.sass'

type AddressListProps = {
  addresses: AddressDTO[]
}

const renderEmptyState = () => <p className='empty-message'>{t('address.list.empty')}</p>

export const AddressList: React.FC<AddressListProps> = ({ addresses }) => {
  const addressListItems = addresses.map((address) => ({
    ...address,
    textValue: `${address.street}, ${address.postalCode}, ${address.city}, ${address.country}${address.isDefault ? ` (${t('address.card.isDefault')})` : ''}`
  }))

  return (
    <ListBox
      aria-label={t('address.list.ariaLabel')}
      className='address-list'
      items={addressListItems}
      renderEmptyState={renderEmptyState}
    >
      {(address) => <ListBoxItem textValue={address.textValue}>{address.textValue}</ListBoxItem>}
    </ListBox>
  )
}
