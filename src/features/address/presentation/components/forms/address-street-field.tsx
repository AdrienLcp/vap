import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import { TextField } from '@/presentation/components/forms/text-field'

export const AddressStreetField: React.FC = () => (
  <TextField
    label={t('address.fields.street.label')}
    name={ADDRESS_FORM_FIELDS.STREET}
    placeholder={t('address.fields.street.placeholder')}
  />
)
