import { Input, Label, TextField as ReactAriaTextField, type TextFieldProps as ReactAriaTextFieldProps, Text } from 'react-aria-components'

import { FieldError } from '@/presentation/components/forms/field-error'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './text-field.sass'

export type TextFieldProps = ReactAriaTextFieldProps & {
  description?: string
  label: string
  placeholder?: string
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  description,
  label,
  maxLength,
  minLength,
  ...textFieldRestProps
}) => (
  <ReactAriaTextField
    {...textFieldRestProps}
    className={values => reactAriaClassNames(values, className, 'text-field')}
    maxLength={maxLength}
    minLength={minLength}
  >
    {({ isInvalid, isRequired }) => (
      <>
        <Label className='label'>
          {label}{isRequired && ' *'}
        </Label>

        <Input className='input' />

        {isInvalid
          ? <FieldError maxLength={maxLength} minLength={minLength} />
          : description && (
            <Text className='description' slot='description'>
              {description}
            </Text>
          )
        }
      </>
    )}
  </ReactAriaTextField>
)
