'use client'

import { SaveIcon } from 'lucide-react'
import { useCallback, useState } from 'react'

import { CATEGORY_CONSTANTS, CATEGORY_ERRORS, CATEGORY_FORM_FIELDS } from '@/features/category/domain/category-constants'
import type { CategoryConflictError, CategoryDTO, CategoryUpdateData, CategoryValidationErrors } from '@/features/category/domain/category-entities'
import { CategoryClient } from '@/features/category/infrastructure/category-client'
import { CategoryDescriptionField } from '@/features/category/presentation/components/forms/category-description-field'
import { CategoryImagePreviewField } from '@/features/category/presentation/components/forms/category-image-preview-field'
import { CategoryNameField } from '@/features/category/presentation/components/forms/category-name-field'
import { BAD_REQUEST_STATUS, CONFLICT_STATUS, OK_STATUS } from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form, type FormValues } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import { getUniqueStringsArray } from '@/utils/array-utils'
import type { Issues } from '@/utils/validation-utils'

type CategoryUpdateFormProps = {
  category: CategoryDTO
}

export const CategoryUpdateForm: React.FC<CategoryUpdateFormProps> = ({ category }) => {
  const [isCategoryUpdateLoading, setIsCategoryUpdateLoading] = useState(false)
  const [categoryUpdateFormErrors, setCategoryUpdateFormErrors] = useState<CategoryValidationErrors>()

  const onCategoryUpdateBadRequestError = useCallback((issues: Issues<CategoryUpdateData>) => {
    const nameErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case CATEGORY_ERRORS.NAME_TOO_LONG:
          nameErrors.push(t('category.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH }))
          break
        default:
          formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
          break
      }
    }

    setCategoryUpdateFormErrors({
      form: getUniqueStringsArray(formErrors),
      [CATEGORY_FORM_FIELDS.NAME]: getUniqueStringsArray(nameErrors)
    })
  }, [])

  const onCategoryUpdateConflictError = useCallback((error: CategoryConflictError) => {
    switch (error) {
      case CATEGORY_ERRORS.NAME_ALREADY_EXISTS:
        setCategoryUpdateFormErrors({ [CATEGORY_FORM_FIELDS.NAME]: t('category.errors.categoryNameAlreadyExists') })
        break
      default:
        setCategoryUpdateFormErrors({ form: t('components.forms.formValidationErrorDefaultMessage') })
        break
    }
  }, [])

  const onCategoryUpdateSuccess = useCallback((updatedCategory: CategoryDTO) => {
    ToastService.success(t('category.update.success', { categoryName: updatedCategory.name }))
  }, [])

  const onCategoryUpdateFormSubmit = useCallback(async (formValues: FormValues) => {
    setCategoryUpdateFormErrors(null)
    setIsCategoryUpdateLoading(true)

    const categoryUpdateData: CategoryUpdateData = {
      name: formValues.getString(CATEGORY_FORM_FIELDS.NAME),
      description: formValues.getOptionalString(CATEGORY_FORM_FIELDS.DESCRIPTION),
      imageUrl: formValues.getOptionalString(CATEGORY_FORM_FIELDS.IMAGE_URL)
    }

    const updatedCategoryResponse = await CategoryClient.updateCategory(category.id, categoryUpdateData)

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
  }, [category.id, onCategoryUpdateBadRequestError, onCategoryUpdateConflictError, onCategoryUpdateSuccess])

  return (
    <Form onSubmit={onCategoryUpdateFormSubmit} validationErrors={categoryUpdateFormErrors}>
      <FieldSet isDisabled={isCategoryUpdateLoading}>
        <CategoryNameField defaultValue={category.name} />

        <CategoryDescriptionField defaultValue={category.description} />

        <CategoryImagePreviewField imageUrl={category.imageUrl} />
      </FieldSet>

      <FormError errors={categoryUpdateFormErrors?.form} />

      <RequiredFieldsMessage />

      <SubmitButton Icon={<SaveIcon />} isPending={isCategoryUpdateLoading}>
        {({ isPending }) => t(`category.update.submit.${isPending ? 'updating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
