'use client'

import React from 'react'

import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import type { CategoryConflictError, CategoryDTO, CategoryUpdateData, CategoryValidationErrors } from '@/category/domain/category-entities'
import { CategoryClient } from '@/category/infrastructure/category-client'
import { CategoryDescriptionField } from '@/category/presentation/components/category-description-field'
import { CategoryImageUrlField } from '@/category/presentation/components/category-image-url-field'
import { CategoryNameField } from '@/category/presentation/components/category-name-field'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import type { Issues } from '@/utils/validation-utils'

export const CategoryUpdateForm: React.FC = () => {
  const [isCategoryUpdateLoading, setIsCategoryUpdateLoading] = React.useState(false)
  const [categoryUpdateFormErrors, setCategoryUpdateFormErrors] = React.useState<CategoryValidationErrors>()

  const onCategoryUpdateBadRequestError = React.useCallback((issues: Issues<CategoryUpdateData>) => {
    const nameErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case CATEGORY_CONSTANTS.NAME_TOO_LONG:
          nameErrors.push(t('category.update.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH }))
          break
        default:
          formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
          break
      }
    }

    setCategoryUpdateFormErrors({
      form: formErrors,
      [CATEGORY_FORM_FIELDS.NAME]: nameErrors
    })
  }, [])

  const onCategoryUpdateConflictError = React.useCallback((error: CategoryConflictError) => {
    switch (error) {
      case CATEGORY_CONSTANTS.NAME_ALREADY_EXISTS:
        setCategoryUpdateFormErrors({
          [CATEGORY_FORM_FIELDS.NAME]: t('category.update.errors.categoryNameAlreadyExists')
        })
        break
      default:
        setCategoryUpdateFormErrors({ form: t('components.forms.formValidationErrorDefaultMessage') })
        break
    }
  }, [])

  const onCategoryUpdateSuccess = React.useCallback((updatedCategory: CategoryDTO) => {
    console.log(updatedCategory)
  }, [])

  const onCategoryUpdateFormSubmit = React.useCallback(async (formData: FormData) => {
    setCategoryUpdateFormErrors(null)
    setIsCategoryUpdateLoading(true)

    const categoryUpdateData: CategoryUpdateData = {
      name: formData.get(CATEGORY_FORM_FIELDS.NAME) as string,
      description: formData.get(CATEGORY_FORM_FIELDS.DESCRIPTION) as string,
      imageUrl: formData.get(CATEGORY_FORM_FIELDS.IMAGE_URL) as string
    }

    const updatedCategoryResponse = await CategoryClient.updateCategory('', categoryUpdateData)

    setIsCategoryUpdateLoading(false)

    switch (updatedCategoryResponse.status) {
      case OK_STATUS:
        onCategoryUpdateSuccess(updatedCategoryResponse.data)
        break
      case BAD_REQUEST_STATUS:
        onCategoryUpdateBadRequestError(updatedCategoryResponse.issues)
        break
      case CONFLICT_STATUS:
        onCategoryUpdateConflictError(updatedCategoryResponse.error)
        break
    }
  }, [onCategoryUpdateBadRequestError, onCategoryUpdateConflictError, onCategoryUpdateSuccess])

  return (
    <Form onSubmit={onCategoryUpdateFormSubmit} validationErrors={categoryUpdateFormErrors}>
      <FieldSet isDisabled={isCategoryUpdateLoading}>
        <CategoryNameField />

        <CategoryDescriptionField />

        <CategoryImageUrlField />
      </FieldSet>

      <FormError validationErrors={categoryUpdateFormErrors} />

      <SubmitButton isPending={isCategoryUpdateLoading}>
        {({ isPending }) => t(`category.update.submit.${isPending ? 'updating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
