import type { PARAMS } from '@/domain/navigation'
import { CategoryPage } from '@/features/category/presentation/components/category-page'
import type { PageParams } from '@/utils/next-utils'

const Page: React.FC<PageParams<typeof PARAMS.categoryId>> = async ({ params }) => {
  const { categoryId } = await params

  return <CategoryPage categoryId={categoryId} />
}

export default Page
