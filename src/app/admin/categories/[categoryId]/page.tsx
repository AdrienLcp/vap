import { CategoryPage } from '@/features/category/presentation/components/category-page'

const Page: React.FC<PageProps<'/admin/categories/[categoryId]'>> = async ({ params }) => {
  const { categoryId } = await params

  return <CategoryPage categoryId={categoryId} />
}

export default Page
