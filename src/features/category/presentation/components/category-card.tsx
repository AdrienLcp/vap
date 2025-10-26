import classNames from 'classnames'

import type { CategoryDTO } from '@/features/category/domain/category-entities'
import { CategoryImage } from '@/features/category/presentation/components/category-image'
import { CategoryMenu } from '@/features/category/presentation/components/category-menu'
import { t } from '@/infrastructure/i18n'
import { Card, CardBody, CardFooter, CardTitle } from '@/presentation/components/ui/card'

import './category-card.sass'

type CategoryCardProps = {
  category: CategoryDTO
  isDisabled?: boolean
  setCategoryList: React.Dispatch<React.SetStateAction<CategoryDTO[]>>
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isDisabled,
  setCategoryList
}) => (
  <Card
    className={classNames('category-card', isDisabled && 'is-disabled')}
    title={t('category.card.showCategorySheet')}
  >
    <CardBody>
      <CategoryImage className='category-image' src={category.imageUrl} />
    </CardBody>

    <CardFooter className='footer'>
      <CardTitle title={category.name}>{category.name}</CardTitle>

      <CategoryMenu categoryId={category.id} setCategoryList={setCategoryList} />
    </CardFooter>
  </Card>
)
