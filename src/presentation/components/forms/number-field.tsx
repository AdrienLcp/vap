import {
  Input,
  Label,
  NumberField as ReactAriaNumberField,
  type NumberFieldProps as ReactAriaNumberFieldProps,
  Text
} from 'react-aria-components'

import { FieldError } from '@/presentation/components/forms/field-error'
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
    className={values => reactAriaClassNames(values, className, 'number-field')}
  >
    {({ isInvalid, isRequired }) => (
      <>
        <Label>{label}{isRequired && ' *'}</Label>

        <Input />

        {isInvalid
          ? <FieldError />
          : description && (
            <Text className='description' slot='description'>
              {description}
            </Text>
          )
        }
      </>
    )}
  </ReactAriaNumberField>
)
