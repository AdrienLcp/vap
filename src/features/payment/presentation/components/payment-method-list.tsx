'use client'

import { useCallback, useEffect, useState } from 'react'

import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'
import { PaymentClient } from '@/features/payment/infrastructure/payment-client'
import { PaymentMethodGridList } from '@/features/payment/presentation/components/payment-method-grid-list'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { Loader } from '@/presentation/components/ui/loaders/loader'
import { ToastService } from '@/presentation/services/toast-service'

export const PaymentMethodList: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<
    PaymentMethodDTO[] | null
  >(null)
  const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(false)

  const loadPaymentMethods = useCallback(async () => {
    setIsLoadingPaymentMethods(true)
    const paymentMethodsResponse = await PaymentClient.findUserPaymentMethods()
    setIsLoadingPaymentMethods(false)

    switch (paymentMethodsResponse.status) {
      case OK_STATUS:
        setPaymentMethods(paymentMethodsResponse.data)
        break
      default:
        ToastService.error(t('payment.method.list.error'))
    }
  }, [])

  useEffect(() => {
    loadPaymentMethods()
  }, [loadPaymentMethods])

  if (isLoadingPaymentMethods) {
    return <Loader />
  }

  if (!paymentMethods) {
    return null
  }

  return (
    <PaymentMethodGridList
      paymentMethods={paymentMethods}
      setPaymentMethods={setPaymentMethods}
    />
  )
}
