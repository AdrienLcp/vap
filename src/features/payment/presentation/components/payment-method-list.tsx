import { useState } from 'react'

import type { PaymentMethodDTO } from '@/features/payment/domain/payment-entities'

export const PaymentMethodList: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodDTO[]>([])
}
