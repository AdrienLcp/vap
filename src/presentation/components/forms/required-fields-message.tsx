import classNames from 'classnames'

import { t } from '@/infrastructure/i18n'

import './required-fields-message.sass'

export const RequiredFieldsMessage: React.FC<React.ComponentProps<'p'>> = ({
  className,
  ...requiredFieldsMessageRestProps
}) => (
  <p
    className={classNames('required-fields-message', className)}
    {...requiredFieldsMessageRestProps}
  >
    {t('components.forms.requiredFields.message', {
      mark: t('components.forms.requiredFields.mark')
    })}
  </p>
)
