import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextArea, type TextAreaProps } from '@/presentation/components/forms/text-area'

export const ProductDescriptionField: React.FC<Partial<TextAreaProps>> = ({
  label = t('product.fields.description.label'),
  name = PRODUCT_FORM_FIELDS.DESCRIPTION,
  placeholder = t('product.fields.description.placeholder'),
  ...productDescriptionFieldProps
}) => (
  <TextArea
    {...productDescriptionFieldProps}
    label={label}
    maxLength={PRODUCT_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
  />
)
