import { PublicProductPage } from '@/features/product/presentation/components/public-product-page'

const Page: React.FC<PageProps<'/products/[productId]'>> = async ({ params }) => {
  const { productId } = await params

  return <PublicProductPage productId={productId} />
}

export default Page
