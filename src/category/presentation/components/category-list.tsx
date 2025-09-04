import { CATEGORY_CONSTANTS } from '@/category/domain/category-constants'
import type { CategoryDTO } from '@/category/domain/category-entities'
import { CategoryCard } from '@/category/presentation/components/category-card'
import type { CSSVariables } from '@/presentation/utils/styles-utils'

type CategoryListProps = {
  categories: CategoryDTO[]
}

const categoryListStyle: CSSVariables = {
  '--category-list-card-min-size': `${CATEGORY_CONSTANTS.IMAGE_SIZE_IN_PX}px`
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => (
  <ul className='category-list' style={categoryListStyle}>
    {categories.map((category) => (
      <li key={category.id}>
        <CategoryCard category={category} />
      </li>
    ))}
  </ul>
)
