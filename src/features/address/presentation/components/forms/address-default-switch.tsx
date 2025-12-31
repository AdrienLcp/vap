import { ADDRESS_FORM_FIELDS } from '@/features/address/domain/address-constants'
import { t } from '@/infrastructure/i18n'
import {
  Switch,
  type SwitchProps
} from '@/presentation/components/forms/switch'

export const AddressDefaultSwitch: React.FC<Partial<SwitchProps>> = ({
  label = t('address.fields.isDefault.label'),
  name = ADDRESS_FORM_FIELDS.IS_DEFAULT,
  ...addressDefaultSwitchRestProps
}) => <Switch {...addressDefaultSwitchRestProps} label={label} name={name} />
