'use client'

import { useState } from 'react'
import { GridList, GridListItem } from 'react-aria-components'

import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'
import { t } from '@/infrastructure/i18n'

type PaymentMethodGridListProps = {
  paymentMethods: PaymentMethodDTO[]
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethodDTO[]>>
}

const renderPaymentMethodGridListEmptyState = () => (
  <p className='empty-message'>{t('payment.method.list.empty')}</p>
)

const buildPaymentMethodTextValue = (paymentMethod: PaymentMethodDTO): string => {
  if (paymentMethod.type === 'CARD') {
    return `**** **** **** ${paymentMethod.last4}`
  }
}

export const PaymentMethodGridList: React.FC<PaymentMethodGridListProps> = ({
  paymentMethods,
  setPaymentMethods
}) => {
  const [isUpdatingPaymentMethods, setIsUpdatingPaymentMethods] = useState(false)

  const paymentMethodListItems = paymentMethods.map((paymentMethod) => ({
    ...paymentMethod,
    textValue: buildPaymentMethodTextValue(paymentMethod)
  }))

  return (
    <GridList
      aria-label={t('payment.method.list.ariaLabel')}
      className='payment-method-list'
      items={paymentMethodListItems}
      renderEmptyState={renderPaymentMethodGridListEmptyState}
    >
      {(paymentMethod) => (
        <GridListItem textValue={paymentMethod.textValue}>
          {/*
          <PaymentMethodItem
            paymentMethod={paymentMethod}
            isUpdatingPaymentMethods={isUpdatingPaymentMethods}
            setPaymentMethods={setPaymentMethods}
            setIsUpdatingPaymentMethods={setIsUpdatingPaymentMethods}
          />
          */}
        </GridListItem>
      )}
    </GridList>
  )
}
