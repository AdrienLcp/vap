import { getAdminCategoryRoute } from '@/domain/navigation'
import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryImage } from '@/features/category/presentation/components/category-image'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'
import { Link } from '@/presentation/components/ui/pressables/link'

type CategoryCardProps = {
  category: CategoryDTO
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <Link href={getAdminCategoryRoute(category.id)}>
    <Card>
      <CardBody>
        <CategoryImage src={category.imageUrl} />
      </CardBody>

      <CardFooter>
        <CardTitle>{category.name}</CardTitle>
      </CardFooter>
    </Card>
  </Link>
)
