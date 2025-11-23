'use client'

import { useCallback, useEffect, useState } from 'react'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressList } from '@/features/address/presentation/components/address-list'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { Link } from '@/presentation/components/ui/pressables/link'
import { ToastService } from '@/presentation/services/toast-service'

import './addresses.sass'
import { ROUTES } from '@/domain/navigation'
import { t } from '@/infrastructure/i18n'

export const Addresses: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressDTO[]>([])
  const [isLoadingAddresses, setIsLoadingAddresses] = useState(false)

  const loadAddresses = useCallback(async () => {
    setIsLoadingAddresses(true)
    const addressesResponse = await AddressClient.findUserAddresses()
    setIsLoadingAddresses(false)

    switch (addressesResponse.status) {
      case OK_STATUS:
        setAddresses(addressesResponse.data)
        break
      default:
        ToastService.error('address.list.error')
    }
  }, [])

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  if (isLoadingAddresses) {
    return <Loader />
  }

  return (
    <div className='addresses'>
      <AddressList addresses={addresses} />

      <Link href={ROUTES.addressCreation} variant='filled'>
        {t('address.create.link')}
      </Link>
    </div>
  )
}
