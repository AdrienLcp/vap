'use client'

import { useState } from 'react'
import { GridList, GridListItem } from 'react-aria-components'

import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'
import { isCardPaymentMethod } from '@/features/payment/domain/payment-helpers'
import { PaymentMethodItem } from '@/features/payment/presentation/components/payment-method-item'
import { t } from '@/infrastructure/i18n'

import './payment-method-grid-list.sass'

type PaymentMethodGridListProps = {
  paymentMethods: PaymentMethodDTO[]
  setPaymentMethods: React.Dispatch<
    React.SetStateAction<PaymentMethodDTO[] | null>
  >
}

const renderPaymentMethodGridListEmptyState = () => (
  <p className='empty-message'>{t('payment.method.list.empty')}</p>
)

const buildPaymentMethodTextValue = (
  paymentMethod: PaymentMethodDTO
): string => {
  if (isCardPaymentMethod(paymentMethod)) {
    return t('payment.method.card.cardTextValue', {
      last4: paymentMethod.last4
    })
  }

  return t('payment.method.card.nonCardTextValue')
}

export const PaymentMethodGridList: React.FC<PaymentMethodGridListProps> = ({
  paymentMethods,
  setPaymentMethods
}) => {
  const [isUpdatingPaymentMethods, setIsUpdatingPaymentMethods] =
    useState(false)

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
          <PaymentMethodItem
            isUpdatingPaymentMethods={isUpdatingPaymentMethods}
            paymentMethod={paymentMethod}
            setIsUpdatingPaymentMethods={setIsUpdatingPaymentMethods}
            setPaymentMethods={setPaymentMethods}
          />
        </GridListItem>
      )}
    </GridList>
  )
}
