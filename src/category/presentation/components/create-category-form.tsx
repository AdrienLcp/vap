'use client'

import React from 'react'

import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import type { CategoryConflictError, CategoryCreationData } from '@/category/domain/category-entities'
import { CategoryClient } from '@/category/infrastructure/category-client'
import { CategoryDescriptionField } from '@/category/presentation/components/category-description-field'
import { CategoryImageUrlField } from '@/category/presentation/components/category-image-url-field'
import { CategoryNameField } from '@/category/presentation/components/category-name-field'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, CREATED_STATUS } from '@/infrastructure/api/http-response'
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

  const onCategoryCreationBadRequestError = React.useCallback((issues: Issues<CategoryCreationData>) => {
    const nameErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case CATEGORY_CONSTANTS.NAME_TOO_LONG:
          nameErrors.push(t('category.create.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH }))
          break
        default:
          formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
          break
      }
    }

    setCreateCategoryFormErrors({
      form: formErrors,
      [CATEGORY_FORM_FIELDS.NAME]: nameErrors
    })
  }, [])

  const onCategoryCreationConflictError = React.useCallback((error: CategoryConflictError) => {
    switch (error) {
      case CATEGORY_CONSTANTS.NAME_ALREADY_EXISTS:
        setCreateCategoryFormErrors({
          [CATEGORY_FORM_FIELDS.NAME]: [t('category.create.errors.categoryNameAlreadyExists')]
        })
        break
      default:
        setCreateCategoryFormErrors({ form: t('components.forms.formValidationErrorDefaultMessage') })
        break
    }
  }, [])

  const onCategoryCreationSuccess = React.useCallback(() => {
    setCreateCategoryFormErrors(null)
  }, [])

  const onCategoryCreationFormSubmit = React.useCallback(async (formData: FormData) => {
    setIsCategoryCreationLoading(true)

    const categoryCreationData: CategoryCreationData = {
      name: formData.get(CATEGORY_FORM_FIELDS.NAME) as string,
      description: formData.get(CATEGORY_FORM_FIELDS.DESCRIPTION) as string,
      imageUrl: formData.get(CATEGORY_FORM_FIELDS.IMAGE_URL) as string
    }

    const createdCategoryResponse = await CategoryClient.createCategory(categoryCreationData)

    setIsCategoryCreationLoading(false)

    switch (createdCategoryResponse.status) {
      case CREATED_STATUS:
        onCategoryCreationSuccess()
        break
      case BAD_REQUEST_STATUS:
        onCategoryCreationBadRequestError(createdCategoryResponse.issues)
        break
      case CONFLICT_STATUS:
        onCategoryCreationConflictError(createdCategoryResponse.error)
        break
    }
  }, [onCategoryCreationBadRequestError, onCategoryCreationConflictError, onCategoryCreationSuccess])

  return (
    <Form onSubmit={onCategoryCreationFormSubmit} validationErrors={createCategoryFormErrors}>
      <CategoryNameField />

      <CategoryDescriptionField />

      <CategoryImageUrlField />

      <FormError validationErrors={createCategoryFormErrors} />

      <Button isPending={isCategoryCreationLoading} type='submit'>
        {({ isPending }) => t(`category.create.form.submit.${isPending ? 'creating' : 'label'}`)}
      </Button>
    </Form>
  )
}
