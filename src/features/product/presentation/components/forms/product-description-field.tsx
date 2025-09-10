import { PRODUCT_CONSTANTS, PRODUCT_FORM_FIELDS } from '@/features/product/domain/product-constants'
import { t } from '@/infrastructure/i18n'
import { TextArea, type TextAreaProps } from '@/presentation/components/forms/text-area'

type ProductDescriptionFieldProps = Omit<Partial<TextAreaProps>, 'defaultValue' | 'value'> & {
  defaultValue?: string | null
  value?: string | null
}

export const ProductDescriptionField: React.FC<ProductDescriptionFieldProps> = ({
  defaultValue,
  label = t('product.fields.description.label'),
  name = PRODUCT_FORM_FIELDS.DESCRIPTION,
  placeholder = t('product.fields.description.placeholder'),
  value,
  ...productDescriptionFieldProps
}) => (
  <TextArea
    defaultValue={defaultValue ?? undefined}
    label={label}
    maxLength={PRODUCT_CONSTANTS.DESCRIPTION_MAX_LENGTH}
    name={name}
    placeholder={placeholder}
    value={value ?? undefined}
    {...productDescriptionFieldProps}
  />
)
