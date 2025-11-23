import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const AddressCountryField: React.FC = () => (
  <TextField
    label={t('address.fields.country.label')}
    name={ADDRESS_FORM_FIELDS.COUNTRY}
    placeholder={t('address.fields.country.placeholder')}
  />
)
