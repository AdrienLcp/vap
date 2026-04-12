'use client'

import { useCallback, useState } from 'react'
import type { Key } from 'react-aria-components'

import { ORDER_CONSTANTS } from '@/features/order/domain/order-constants'
import type { OrderStatus } from '@/features/order/domain/order-entities'
import { OrderClient } from '@/features/order/infrastructure/order-client'
import { OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import type { SelectItem } from '@/presentation/components/forms/select'
import { Select } from '@/presentation/components/forms/select'
import { ToastService } from '@/presentation/services/toast-service'

type OrderStatusSelectorProps = {
  orderId: string
  status: OrderStatus
}

const statusItems: SelectItem[] = ORDER_CONSTANTS.STATUS.map((status) => ({
  id: status,
  textValue: t(`order.status.${status}` as 'order.status.PAID')
}))

export const OrderStatusSelector: React.FC<OrderStatusSelectorProps> = ({
  orderId,
  status
}) => {
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(status)

  const onStatusChange = useCallback(
    async (key: Key | null) => {
      if (key == null) {
        return
      }

      const newStatus = String(key) as OrderStatus

      const response = await OrderClient.updateOrderStatus(orderId, newStatus)

      if (response.status !== OK_STATUS) {
        ToastService.error(t('order.admin.statusUpdateError'))
        return
      }

      setCurrentStatus(newStatus)
      ToastService.success(t('order.admin.statusUpdateSuccess'))
    },
    [orderId]
  )

  return (
    <Select
      items={statusItems}
      label={t('order.admin.statusLabel')}
      onChange={onStatusChange}
      value={currentStatus}
    />
  )
}
