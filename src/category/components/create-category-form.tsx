'use client'

import React from 'react'

import { CategoryClient } from '@/category/category-client'
import { CategoryDescriptionField } from '@/category/components/category-description-field'
import { CategoryImageUrlField } from '@/category/components/category-image-url-field'
import { CategoryNameField } from '@/category/components/category-name-field'
import { CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import type { CategoryCreationData } from '@/category/domain/category-entities'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { Button } from '@/presentation/components/ui/pressables/button'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import type { ValueOf } from '@/utils/object-utils'

type CreateCategoryFormFieldName = ValueOf<typeof CATEGORY_FORM_FIELDS>
type CreateCategoryValidationErrors = ValidationErrors<CreateCategoryFormFieldName>

export const CreateCategoryForm: React.FC = () => {
  const [isCategoryCreationLoading, setIsCategoryCreationLoading] = React.useState(false)
  const [createCategoryFormErrors, setCreateCategoryFormErrors] = React.useState<CreateCategoryValidationErrors>()

  const onCategoryCreationFormSubmit = async (formData: FormData) => {
    setIsCategoryCreationLoading(true)

    const categoryCreationData: CategoryCreationData = {
      name: formData.get(CATEGORY_FORM_FIELDS.NAME) as string,
      description: formData.get(CATEGORY_FORM_FIELDS.DESCRIPTION) as string,
      imageUrl: formData.get(CATEGORY_FORM_FIELDS.IMAGE_URL) as string
    }

    const createdCategoryResponse = await CategoryClient.createCategory(categoryCreationData)
    setIsCategoryCreationLoading(false)

    if (createdCategoryResponse.status === 201) {
      setCreateCategoryFormErrors(undefined)
      return
    }

    switch (createdCategoryResponse.status) {
      case 400:
        console.error(createdCategoryResponse.error)
        break
      case 409:
        switch (createdCategoryResponse.error) {
          case 'CATEGORY_NAME_ALREADY_EXISTS':
            setCreateCategoryFormErrors({
              [CATEGORY_FORM_FIELDS.NAME]: t('category.create.errors.categoryNameAlreadyExists')
            })
            break
        }
        break
    }
  }

  return (
    <Form onSubmit={onCategoryCreationFormSubmit} validationErrors={createCategoryFormErrors}>
      <CategoryNameField />

      <CategoryDescriptionField />

      <CategoryImageUrlField />

      <Button isPending={isCategoryCreationLoading} type='submit'>
        {t(isCategoryCreationLoading
          ? 'category.create.form.submit.creating'
          : 'category.create.form.submit.label'
        )}
      </Button>
    </Form>
  )
}
