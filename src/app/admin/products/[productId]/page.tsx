import { ProductPage } from '@/features/product/presentation/components/product-page'

const Page: React.FC<PageProps<'/admin/products/[productId]'>> = async ({ params }) => {
  const { productId } = await params

  return <ProductPage productId={productId} />
}

export default Page
