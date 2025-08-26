import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextArea, type TextAreaProps } from '@/presentation/components/forms/text-area'

export const CategoryDescriptionField: React.FC<Partial<TextAreaProps>> = ({
  label = t('category.fields.description.label'),
  name = CATEGORY_FORM_FIELDS.DESCRIPTION,
  placeholder = t('category.fields.description.placeholder'),
  ...categoryDescriptionFieldRestProps
}) => (
  <TextArea
    {...categoryDescriptionFieldRestProps}
    label={label}
    maxLength={CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
  />
)
