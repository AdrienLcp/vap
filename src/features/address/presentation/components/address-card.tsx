import classNames from 'classnames'
import { CheckIcon, PenIcon, TrashIcon } from 'lucide-react'

import { getAddressRoute } from '@/domain/navigation'
import type { AddressDTO } from '@/features/address/domain/address-entities'
import { t } from '@/infrastructure/i18n'
import { Card } from '@/presentation/components/ui/card'
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
    <Card className={classNames('address-card', address.isDefault && 'selected')}>
      <div className='address-header'>
        <span className='name'>{address.name ?? address.street}</span>

        <Link
          aria-label={t('address.card.editLinkAriaLabel')}
          href={getAddressRoute(address.id)}
          Icon={<PenIcon aria-hidden />}
          size='small'
          variant='transparent'
        />

        <Button
          aria-label={t('address.card.deleteButtonAriaLabel')}
          Icon={<TrashIcon aria-hidden />}
          isDisabled={isLoading}
          onPress={deleteAddress}
          size='small'
          variant='transparent'
        />
      </div>

      <div className='details'>
        {address.name && address.street && <span>{address.street}</span>}
        {postalCodeAndCity.length > 0 && (
          <span>
            {postalCodeAndCity.join(' ')}
          </span>
        )}
        {address.country && <span>{address.country}</span>}
      </div>

      {address.isDefault ? (
        <span className='default-address-label'>
          <CheckIcon aria-hidden />

          {t('address.card.isDefault')}
        </span>
      ) : (
        <Button
          className='default-address-button'
          isDisabled={isLoading}
          onPress={setDefaultAddress}
          size='small'
          variant='underlined'
        >
          {t('address.card.makeDefault')}
        </Button>
      )}
    </Card>
  )
}
