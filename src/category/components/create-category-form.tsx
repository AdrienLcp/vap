'use client'

import React from 'react'

import { CategoryClient } from '@/category/category-client'
import type { CategoryCreationData } from '@/category/domain/category-entities'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { TextField } from '@/presentation/components/forms/text-field'
import { Button } from '@/presentation/components/ui/pressables/button'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import type { ValueOf } from '@/utils/object-utils'

const createCategoryFormFields = {
  name: 'name',
  description: 'description',
  imageUrl: 'image-url'
} as const

type CreateCategoryFormFieldName = ValueOf<typeof createCategoryFormFields>
type CreateCategoryValidationErrors = ValidationErrors<CreateCategoryFormFieldName>

export const CreateCategoryForm: React.FC = () => {
  const [isCategoryCreationLoading, setIsCategoryCreationLoading] = React.useState(false)
  const [createCategoryFormErrors, setCreateCategoryFormErrors] = React.useState<CreateCategoryValidationErrors>()

  const onCategoryCreationFormSubmit = async (formData: FormData) => {
    setIsCategoryCreationLoading(true)

    const categoryCreationData: CategoryCreationData = {
      name: formData.get(createCategoryFormFields.name) as string,
      description: formData.get(createCategoryFormFields.description) as string,
      imageUrl: formData.get(createCategoryFormFields.imageUrl) as string
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
      case 401:
        console.error(createdCategoryResponse)
        break
      case 403:
        console.error(createdCategoryResponse)
        break
      case 409:
        console.error(createdCategoryResponse.error)
        break
      case 500:
        console.error(createdCategoryResponse)
        break
      default:
        console.error(createdCategoryResponse)
    }
  }

  return (
    <Form onSubmit={onCategoryCreationFormSubmit} validationErrors={createCategoryFormErrors}>
      <TextField
        isRequired
        label={t('category.create.form.name.label')}
        name={createCategoryFormFields.name}
        placeholder={t('category.create.form.name.placeholder')}
        type='text'
      />

      <TextField
        label={t('category.create.form.description.label')}
        name={createCategoryFormFields.description}
        placeholder={t('category.create.form.description.placeholder')}
        type='text'
      />

      <TextField
        label={t('category.create.form.image.label')}
        name={createCategoryFormFields.imageUrl}
        placeholder={t('category.create.form.image.placeholder')}
        type='url'
      />

      <Button isPending={isCategoryCreationLoading} type='submit'>
        {t(isCategoryCreationLoading
          ? 'category.create.form.submit.creating'
          : 'category.create.form.submit.label'
        )}
      </Button>
    </Form>
  )
}
