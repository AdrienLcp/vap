import { AddressPage } from '@/features/address/presentation/components/address-page'

const Page: React.FC<PageProps<'/auth/addresses/[addressId]'>> = async ({
  params
}) => {
  const { addressId } = await params

  return <AddressPage addressId={addressId} />
}

export default Page
