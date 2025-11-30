'use client'

import { useCallback, useEffect, useState } from 'react'

import type { AddressDTO } from '@/features/address/domain/address-entities'
import { AddressClient } from '@/features/address/infrastructure/address-client'
import { AddressGridList } from '@/features/address/presentation/components/address-grid-list'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { ToastService } from '@/presentation/services/toast-service'

export const AddressList: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressDTO[] | null>(null)
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
        ToastService.error(t('address.list.error'))
    }
  }, [])

  useEffect(() => {
    loadAddresses()
  }, [loadAddresses])

  if (isLoadingAddresses) {
    return <Loader />
  }

  if (!addresses) {
    return null
  }

  return <AddressGridList addresses={addresses} setAddresses={setAddresses} />
}
