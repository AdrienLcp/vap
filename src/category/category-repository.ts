import 'server-only'

import type { CategoryCreationData, CategoryDTO, CategoryNameAlreadyExists, CategoryUpdateData } from '@/category/domain/category-entities'
import { type Result, success, unknownError } from '@/helpers/result'
import { CategoryDatabase, type Select } from '@/infrastructure/database'

const categorySelectedFields: Select<CategoryDTO> = {
  id: true,
  name: true,
  description: true,
  imageUrl: true
}

const createCategory = async (categoryCreationData: CategoryCreationData): Promise<Result<CategoryNameAlreadyExists, CategoryDTO>> => {
  try {
    const createdCategory = await CategoryDatabase.create({
      data: {
        name: categoryCreationData.name,
        description: categoryCreationData.description,
        imageUrl: categoryCreationData.imageUrl
      },
      select: categorySelectedFields
    })

    return success(createdCategory)
  } catch (error) {
    return unknownError('Unknown error in CategoryRepository.createCategory:', error)
  }
}

const findCategories = async (): Promise<Result<null, CategoryDTO[]>> => {
  try {
    const categories = await CategoryDatabase.findMany({ select: categorySelectedFields })

    return success(categories)
  } catch (error) {
    return unknownError('Unknown error in CategoryRepository.findCategories:', error)
  }
}

const updateCategory = async (categoryId: string, categoryData: CategoryUpdateData): Promise<Result<CategoryNameAlreadyExists, CategoryDTO>> => {
  try {
    const updatedCategory = await CategoryDatabase.update({
      where: { id: categoryId },
      data: categoryData,
      select: categorySelectedFields
    })

    return success(updatedCategory)
  } catch (error) {
    return unknownError('Unknown error in CategoryRepository.updateCategory:', error)
  }
}

export const CategoryRepository = {
  createCategory,
  findCategories,
  updateCategory
}
