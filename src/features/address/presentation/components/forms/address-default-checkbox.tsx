import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import { Switch } from '@/presentation/components/forms/switch'

export const AddressDefaultCheckbox: React.FC = () => (
  <Switch label={t('address.fields.isDefault.label')} name={ADDRESS_FORM_FIELDS.IS_DEFAULT} />
)
