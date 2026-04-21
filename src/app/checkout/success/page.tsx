import { CheckoutSuccessPage } from '@/features/payment/presentation/components/checkout-success-page'

const Page: React.FC<PageProps<'/checkout/success'>> = async ({
  searchParams
}) => {
  const { session_id: sessionIdParam } = await searchParams
  const sessionId =
    typeof sessionIdParam === 'string' && sessionIdParam.length > 0
      ? sessionIdParam
      : null

  return <CheckoutSuccessPage sessionId={sessionId} />
}

export default Page
