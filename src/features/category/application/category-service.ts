import 'server-only'

import type { Forbidden, NotFound, Unauthorized } from '@/domain/entities'
import { AuthService } from '@/features/auth/application/auth-service'
import type {
  Category,
  CategoryCreationData,
  CategoryDTO,
  CategoryEditError,
  CategoryUpdateData
} from '@/features/category/domain/category-entities'
import { CategoryRepository } from '@/features/category/infrastructure/category-repository'
import { ProductService } from '@/features/product/application/product-service'
import { failure, type Result, success } from '@/helpers/result'

const enrichCategoryWithProductCount = async (category: Category): Promise<CategoryDTO> => {
  const categoryProductCountResult = await ProductService.getCategoryProductCount(category.id)

  const productCount =
    categoryProductCountResult.status === 'SUCCESS' ? categoryProductCountResult.data : 0

  return {
    description: category.description,
    id: category.id,
    imageUrl: category.imageUrl,
    name: category.name,
    productCount
  } satisfies CategoryDTO
}

const createCategory = async (
  categoryCreationData: CategoryCreationData
): Promise<Result<CategoryDTO, CategoryEditError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canCreateCategory) {
    return failure('FORBIDDEN')
  }

  const createdCategoryResult = await CategoryRepository.createCategory(categoryCreationData)

  if (createdCategoryResult.status === 'ERROR') {
    return createdCategoryResult
  }

  const categoryDTO: CategoryDTO = {
    ...createdCategoryResult.data,
    productCount: 0
  }

  return success(categoryDTO)
}

const deleteCategory = async (
  categoryId: string
): Promise<Result<null, Forbidden | Unauthorized>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canDeleteCategory) {
    return failure('FORBIDDEN')
  }

  const productCategoryDeletionResult = await ProductService.removeProductsCategory(categoryId)

  if (productCategoryDeletionResult.status === 'ERROR') {
    return productCategoryDeletionResult
  }

  return await CategoryRepository.deleteCategory(categoryId)
}

const findCategories = async (): Promise<Result<CategoryDTO[]>> => {
  const categoryListResult = await CategoryRepository.findCategories()

  if (categoryListResult.status === 'ERROR') {
    return categoryListResult
  }

  const categoryListDTO: CategoryDTO[] = []

  for (const category of categoryListResult.data) {
    const categoryDTO: CategoryDTO = await enrichCategoryWithProductCount(category)
    categoryListDTO.push(categoryDTO)
  }

  return success(categoryListDTO)
}

const findCategory = async (categoryId: string): Promise<Result<CategoryDTO, NotFound>> => {
  const categoryResult = await CategoryRepository.findCategory(categoryId)

  if (categoryResult.status === 'ERROR') {
    return categoryResult
  }

  const categoryDTO: CategoryDTO = await enrichCategoryWithProductCount(categoryResult.data)

  return success(categoryDTO)
}

const updateCategory = async (
  categoryId: string,
  categoryUpdateData: CategoryUpdateData
): Promise<Result<CategoryDTO, CategoryEditError>> => {
  const userResult = await AuthService.findUserDTO()

  if (userResult.status === 'ERROR') {
    return failure('UNAUTHORIZED')
  }

  if (!userResult.data.permissions.canUpdateCategory) {
    return failure('FORBIDDEN')
  }

  const updatedCategoryResult = await CategoryRepository.updateCategory(
    categoryId,
    categoryUpdateData
  )

  if (updatedCategoryResult.status === 'ERROR') {
    return updatedCategoryResult
  }

  const categoryDTO: CategoryDTO = await enrichCategoryWithProductCount(updatedCategoryResult.data)

  return success(categoryDTO)
}

export const CategoryService = {
  createCategory,
  deleteCategory,
  findCategories,
  findCategory,
  updateCategory
}
