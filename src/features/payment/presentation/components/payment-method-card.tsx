import classNames from 'classnames'
import { PenIcon, TrashIcon } from 'lucide-react'

import { getPaymentMethodRoute } from '@/domain/navigation'
import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'
import { t } from '@/infrastructure/i18n'
import { Card } from '@/presentation/components/ui/card'
import { DefaultSelector } from '@/presentation/components/ui/default-selector'
import { Button } from '@/presentation/components/ui/pressables/button'
import { Link } from '@/presentation/components/ui/pressables/link'

import './payment-method-card.sass'

type PaymentMethodCardProps = {
  deletePaymentMethod: () => void
  isLoading: boolean
  paymentMethod: PaymentMethodDTO & { textValue: string }
  setDefaultPaymentMethod: () => void
}

export const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  deletePaymentMethod,
  isLoading,
  paymentMethod,
  setDefaultPaymentMethod
}) => (
  <Card className={classNames('payment-method-card', paymentMethod.isDefault && 'selected')}>
    <div className='payment-method-header'>
      <span className='name'>{paymentMethod.textValue}</span>

      <Link
        aria-label={t('payment.method.card.editLinkAriaLabel')}
        href={getPaymentMethodRoute(paymentMethod.id)}
        Icon={<PenIcon aria-hidden />}
        size='small'
        tooltip={t('payment.method.card.editLinkAriaLabel')}
        variant='transparent'
      />

      <Button
        aria-label={t('payment.method.card.deleteButtonAriaLabel')}
        Icon={<TrashIcon aria-hidden />}
        isDisabled={isLoading}
        onPress={deletePaymentMethod}
        size='small'
        tooltip={t('payment.method.card.deleteButtonAriaLabel')}
        variant='transparent'
      />
    </div>

    <div></div>

    <DefaultSelector
      isDefault={paymentMethod.isDefault}
      isDefaultMessage={t('payment.method.card.isDefault')}
      isDisabled={isLoading}
      makeDefaultMessage={t('payment.method.card.makeDefault')}
      onPress={setDefaultPaymentMethod}
    />
  </Card>
)
