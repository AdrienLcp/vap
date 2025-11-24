import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import { TextField, type TextFieldProps } from '@/presentation/components/forms/text-field'

export const AddressPostalCodeField: React.FC<Partial<TextFieldProps>> = ({
  label = t('address.fields.postalCode.label'),
  name = ADDRESS_FORM_FIELDS.POSTAL_CODE,
  placeholder = t('address.fields.postalCode.placeholder'),
  ...addressPostalCodeFieldRestProps
}) => (
  <TextField
    {...addressPostalCodeFieldRestProps}
    label={label}
    name={name}
    placeholder={placeholder}
  />
)
