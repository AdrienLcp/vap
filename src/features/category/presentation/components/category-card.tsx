import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryImage } from '@/features/category/presentation/components/category-image'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'

type CategoryCardProps = {
  category: CategoryDTO
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => (
  <Card>
    <CardBody>
      <CategoryImage src={category.imageUrl} />
    </CardBody>

    <CardFooter>
      <CardTitle>{category.name}</CardTitle>
    </CardFooter>
  </Card>
)
