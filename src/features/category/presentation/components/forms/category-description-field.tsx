import { CATEGORY_CONSTANTS, CATEGORY_FORM_FIELDS } from '@/features/category/domain/category-constants'
import { t } from '@/infrastructure/i18n'
import { TextArea, type TextAreaProps } from '@/presentation/components/forms/text-area'

type CategoryDescriptionFieldProps = Omit<Partial<TextAreaProps>, 'defaultValue' | 'value'> & {
  defaultValue?: string | null
  value?: string | null
}

export const CategoryDescriptionField: React.FC<CategoryDescriptionFieldProps> = ({
  defaultValue,
  label = t('category.fields.description.label'),
  name = CATEGORY_FORM_FIELDS.DESCRIPTION,
  placeholder = t('category.fields.description.placeholder'),
  value,
  ...categoryDescriptionFieldRestProps
}) => (
  <TextArea
    defaultValue={defaultValue ?? undefined}
    label={label}
    maxLength={CATEGORY_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
    value={value ?? undefined}
    {...categoryDescriptionFieldRestProps}
  />
)
