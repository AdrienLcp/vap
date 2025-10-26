'use client'

import { SaveIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useCallback, useState } from 'react'

import { getAdminCategoryRoute } from '@/domain/navigation'
import {
  CATEGORY_CONSTANTS,
  CATEGORY_ERRORS,
  CATEGORY_FORM_FIELDS
} from '@/features/category/domain/category-constants'
import type {
  CategoryConflictError,
  CategoryCreationData,
  CategoryDTO,
  CategoryValidationErrors
} from '@/features/category/domain/category-entities'
import { CategoryCreationSchema } from '@/features/category/domain/category-schemas'
import { CategoryClient } from '@/features/category/infrastructure/category-client'
import { CategoryDescriptionField } from '@/features/category/presentation/components/forms/category-description-field'
import { CategoryImagePreviewField } from '@/features/category/presentation/components/forms/category-image-preview-field'
import { CategoryNameField } from '@/features/category/presentation/components/forms/category-name-field'
import {
  BAD_REQUEST_STATUS,
  CONFLICT_STATUS,
  CREATED_STATUS
} from '@/infrastructure/api/http-response'
import { t } from '@/infrastructure/i18n'
import { FieldSet } from '@/presentation/components/forms/field-set'
import { Form } from '@/presentation/components/forms/form'
import { FormError } from '@/presentation/components/forms/form-error'
import { RequiredFieldsMessage } from '@/presentation/components/forms/required-fields-message'
import { SubmitButton } from '@/presentation/components/ui/pressables/submit-button'
import { ToastService } from '@/presentation/services/toast-service'
import { getUniqueStringsArray } from '@/utils/array-utils'
import type { Issues } from '@/utils/validation-utils'

export const CategoryCreationForm: React.FC = () => {
  const [isCategoryCreationLoading, setIsCategoryCreationLoading] = useState(false)
  const [formErrors, setFormErrors] = useState<CategoryValidationErrors>()

  const onCategoryCreationBadRequestError = useCallback((issues: Issues<CategoryCreationData>) => {
    const nameErrors: string[] = []
    const formErrors: string[] = []

    for (const issue of issues) {
      switch (issue.message) {
        case CATEGORY_ERRORS.NAME_TOO_LONG:
          nameErrors.push(
            t('category.errors.categoryNameTooLong', { max: CATEGORY_CONSTANTS.NAME_MAX_LENGTH })
          )
          break
        default:
          formErrors.push(t('components.forms.formValidationErrorDefaultMessage'))
          break
      }
    }

    setFormErrors({
      form: getUniqueStringsArray(formErrors),
      [CATEGORY_FORM_FIELDS.NAME]: getUniqueStringsArray(nameErrors)
    })
  }, [])

  const onCategoryCreationConflictError = useCallback((error: CategoryConflictError) => {
    switch (error) {
      case CATEGORY_ERRORS.NAME_ALREADY_EXISTS:
        setFormErrors({
          [CATEGORY_FORM_FIELDS.NAME]: t('category.errors.categoryNameAlreadyExists')
        })
        break
      default:
        setFormErrors({ form: t('components.forms.formValidationErrorDefaultMessage') })
        break
    }
  }, [])

  const onCategoryCreationSuccess = useCallback((createdCategory: CategoryDTO) => {
    ToastService.success(t('category.creation.success', { categoryName: createdCategory.name }))
    const createdCategoryRoute = getAdminCategoryRoute(createdCategory.id)
    redirect(createdCategoryRoute)
  }, [])

  const onCategoryCreationFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsCategoryCreationLoading(true)
      setFormErrors(null)

      const categoryCreationData = {
        description: formData.get(CATEGORY_FORM_FIELDS.DESCRIPTION),
        imageUrl: formData.get(CATEGORY_FORM_FIELDS.IMAGE_URL),
        name: formData.get(CATEGORY_FORM_FIELDS.NAME)
      }

      const categoryCreationValidation = CategoryCreationSchema.safeParse(categoryCreationData)

      if (!categoryCreationValidation.success) {
        setIsCategoryCreationLoading(false)
        onCategoryCreationBadRequestError(categoryCreationValidation.error.issues)
        return
      }

      const createdCategoryResponse = await CategoryClient.createCategory(
        categoryCreationValidation.data
      )

      setIsCategoryCreationLoading(false)

      switch (createdCategoryResponse.status) {
        case CREATED_STATUS:
          onCategoryCreationSuccess(createdCategoryResponse.data)
          break
        case BAD_REQUEST_STATUS:
          onCategoryCreationBadRequestError(createdCategoryResponse.issues)
          break
        case CONFLICT_STATUS:
          onCategoryCreationConflictError(createdCategoryResponse.error)
          break
      }
    },
    [onCategoryCreationBadRequestError, onCategoryCreationConflictError, onCategoryCreationSuccess]
  )

  return (
    <Form onSubmit={onCategoryCreationFormSubmit} validationErrors={formErrors}>
      <FieldSet isDisabled={isCategoryCreationLoading}>
        <CategoryNameField />

        <CategoryDescriptionField />

        <CategoryImagePreviewField />
      </FieldSet>

      <FormError errors={formErrors?.form} />

      <RequiredFieldsMessage />

      <SubmitButton Icon={<SaveIcon aria-hidden />} isPending={isCategoryCreationLoading}>
        {({ isPending }) => t(`category.creation.submit.${isPending ? 'creating' : 'label'}`)}
      </SubmitButton>
    </Form>
  )
}
