import classNames from 'classnames'
import { PenIcon, TrashIcon } from 'lucide-react'

import { getAddressRoute } from '@/domain/navigation'
import type { AddressDTO } from '@/features/address/domain/address-entities'
import { t } from '@/infrastructure/i18n'
import { Card } from '@/presentation/components/ui/card'
import { DefaultSelector } from '@/presentation/components/ui/default-selector'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'

import './address-card.sass'

type AddressCardProps = {
  address: AddressDTO
  deleteAddress: () => void
  isLoading: boolean
  setDefaultAddress: () => void
}

export const AddressCard: React.FC<AddressCardProps> = ({
  address,
  deleteAddress,
  isLoading,
  setDefaultAddress
}) => {
  const postalCodeAndCity = [address.postalCode, address.city].filter(Boolean)

  return (
    <Card
      className={classNames('address-card', address.isDefault && 'selected')}
    >
      <div className='address-header'>
        <span className='name'>{address.name ?? address.street}</span>

        <Link
          aria-label={t('address.card.editLinkAriaLabel')}
          href={getAddressRoute(address.id)}
          Icon={<PenIcon aria-hidden />}
          size='small'
          tooltip={t('address.card.editLinkAriaLabel')}
          variant='transparent'
        />

        <Button
          aria-label={t('address.card.deleteButtonAriaLabel')}
          Icon={<TrashIcon aria-hidden />}
          isDisabled={isLoading}
          onPress={deleteAddress}
          size='small'
          tooltip={t('address.card.deleteButtonAriaLabel')}
          variant='transparent'
        />
      </div>

      <div className='details'>
        {address.name && address.street && <span>{address.street}</span>}
        {postalCodeAndCity.length > 0 && (
          <span>{postalCodeAndCity.join(' ')}</span>
        )}
        {address.country && <span>{address.country}</span>}
      </div>

      <DefaultSelector
        isDefault={address.isDefault}
        isDefaultMessage={t('payment.method.card.isDefault')}
        isDisabled={isLoading}
        makeDefaultMessage={t('payment.method.card.makeDefault')}
        onPress={setDefaultAddress}
      />
    </Card>
  )
}
