import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import {
  TextField,
  type TextFieldProps
} from '@/presentation/components/forms/text-field'

export const AddressNameField: React.FC<Partial<TextFieldProps>> = ({
  autoComplete = 'off',
  label = t('address.fields.name.label'),
  name = ADDRESS_FORM_FIELDS.NAME,
  placeholder = t('address.fields.name.placeholder'),
  ...addressNameFieldRestProps
}) => (
  <TextField
    {...addressNameFieldRestProps}
    autoComplete={autoComplete}
    label={label}
    name={name}
    placeholder={placeholder}
  />
)
