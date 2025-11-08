import {
  Input,
  NumberField as ReactAriaNumberField,
  type NumberFieldProps as ReactAriaNumberFieldProps,
  Text
} from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { FieldError } from '@/presentation/components/forms/field-error'
import { Label } from '@/presentation/components/ui/label'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './number-field.sass'

export type NumberFieldProps = ReactAriaNumberFieldProps & {
  description?: string
  label: string
  placeholder?: string
}

export const NumberField: React.FC<NumberFieldProps> = ({
  className,
  description,
  label,
  ...numberFieldRestProps
}) => (
  <ReactAriaNumberField
    {...numberFieldRestProps}
    className={(values) => reactAriaClassNames(values, className, 'number-field')}
  >
    {({ isInvalid, isRequired }) => (
      <>
        <Label>
          {label} {isRequired && t('components.forms.requiredFields.mark')}
        </Label>

        <Input />

        {isInvalid ? (
          <FieldError />
        ) : (
          description && (
            <Text className='description' slot='description'>
              {description}
            </Text>
          )
        )}
      </>
    )}
  </ReactAriaNumberField>
)
