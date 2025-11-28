'use client'

import { useCallback } from 'react'

import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'
import { PaymentClient } from '@/features/payment/infrastructure/payment-client'
import { NO_CONTENT_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { ToastService } from '@/presentation/services/toast-service'

type PaymentMethodItemProps = {
  paymentMethod: PaymentMethodDTO
  isUpdatingPaymentMethods: boolean
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethodDTO[]>>
  setIsUpdatingPaymentMethods: (isLoading: boolean) => void
}

export const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  paymentMethod,
  isUpdatingPaymentMethods,
  setPaymentMethods,
  setIsUpdatingPaymentMethods
}) => {
  const deletePaymentMethod = useCallback(async () => {
    setIsUpdatingPaymentMethods(true)

    const paymentMethodDeletionResponse = await PaymentClient.deleteUserPaymentMethod(
      paymentMethod.id
    )

    switch (paymentMethodDeletionResponse.status) {
      case NO_CONTENT_STATUS:
        setPaymentMethods((previousPaymentMethods) =>
          previousPaymentMethods.filter((pm) => pm.id !== paymentMethod.id)
        )
        break
      default:
      ToastService.error(t('payment.method.card.deletePaymentMethodError'))
    }

    setIsUpdatingPaymentMethods(false)
  }, [paymentMethod.id, setPaymentMethods, setIsUpdatingPaymentMethods])

  const setDefaultPaymentMethod = useCallback(async () => {
    setIsUpdatingPaymentMethods(true)

    const paymentMethodUpdateResponse = await PaymentClient.setUserDefaultPaymentMethod(
      paymentMethod.id
    )

    switch (paymentMethodUpdateResponse.status) {
      case OK_STATUS:
        setPaymentMethods(paymentMethodUpdateResponse.data)
        break
      default:
        ToastService.error(t('payment.method.card.updateDefaultPaymentMethodError'))
    }
  }, [paymentMethod.id, setPaymentMethods, setIsUpdatingPaymentMethods])

  return (
    <>
      {/* 
        <PaymentMethodCard
          deletePaymentMethod={deletePaymentMethod}
          isLoading={isUpdatingPaymentMethods}
          paymentMethod={paymentMethod}
          setDefaultPaymentMethod={setDefaultPaymentMethod}
        />
      */}
    </>
  )
}
