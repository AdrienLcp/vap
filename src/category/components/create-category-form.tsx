'use client'

import React from 'react'

import { CategoryClient } from '@/category/category-client'
import { CategoryDescriptionField } from '@/category/components/category-description-field'
import { CategoryImageUrlField } from '@/category/components/category-image-url-field'
import { CategoryNameField } from '@/category/components/category-name-field'
import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import type { CategoryCreationData } from '@/category/domain/category-entities'
import { t } from '@/infrastructure/i18n'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { Button } from '@/presentation/components/ui/pressables/button'
import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'
import type { ValueOf } from '@/utils/object-utils'
import type { Issues } from '@/utils/validation-utils'

type CreateCategoryFormFieldName = ValueOf<typeof CATEGORY_FORM_FIELDS>
type CreateCategoryValidationErrors = ValidationErrors<CreateCategoryFormFieldName>

export const CreateCategoryForm: React.FC = () => {
  const [isCategoryCreationLoading, setIsCategoryCreationLoading] = React.useState(false)
  const [createCategoryFormErrors, setCreateCategoryFormErrors] = React.useState<CreateCategoryValidationErrors | null>(null)

  const onBadRequestError = (issues: Issues<CategoryCreationData>) => {
    const nameErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case CATEGORY_CONSTANTS.NAME_TOO_LONG:
          nameErrors.push(t('category.create.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH }))
          nameErrors.push(t('category.create.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH }))
          break
        default:
          formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
          break
      }
    }

    formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
    formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))

    setCreateCategoryFormErrors({
      form: formErrors,
      [CATEGORY_FORM_FIELDS.NAME]: nameErrors
    })
  }

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
      setCreateCategoryFormErrors(null)
      return
    }

    switch (createdCategoryResponse.status) {
      case 400:
        onBadRequestError(createdCategoryResponse.issues)
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

      <FormError validationErrors={createCategoryFormErrors} />

      <Button isPending={isCategoryCreationLoading} type='submit'>
        {t(isCategoryCreationLoading
          ? 'category.create.form.submit.creating'
          : 'category.create.form.submit.label'
        )}
      </Button>
    </Form>
  )
}
