import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const AddressCityField: React.FC = () => (
  <TextField
    label={t('address.fields.city.label')}
    name={ADDRESS_FORM_FIELDS.CITY}
    placeholder={t('address.fields.city.placeholder')}
  />
)
