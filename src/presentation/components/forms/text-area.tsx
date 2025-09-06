import { Label, TextArea as ReactAriaTextArea, TextField as ReactAriaTextField, type TextFieldProps as ReactAriaTextFieldProps, Text } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { FieldError } from '@/presentation/components/forms/field-error'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './text-area.sass'

export type TextAreaProps = ReactAriaTextFieldProps & {
  description?: string
  label: string
  placeholder?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  className,
  description,
  label,
  maxLength,
  minLength,
  ...textFieldRestProps
}) => (
  <ReactAriaTextField
    {...textFieldRestProps}
    className={values => reactAriaClassNames(values, className, 'text-area')}
    maxLength={maxLength}
    minLength={minLength}
  >
    {({ isInvalid, isRequired }) => (
      <>
        <Label className='label'>
          {label} {isRequired && t('components.forms.requiredFields.mark')}
        </Label>

        <ReactAriaTextArea />

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
