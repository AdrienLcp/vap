import {
  Input,
  Label,
  TextField as ReactAriaTextField,
  type TextFieldProps as ReactAriaTextFieldProps,
  Text
} from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { FieldError } from '@/presentation/components/forms/field-error'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './text-field.sass'

export type TextFieldProps = ReactAriaTextFieldProps & {
  description?: string
  EndContent?: React.ReactNode
  label: React.ReactNode
  placeholder?: string
  StartContent?: React.ReactNode
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  description,
  EndContent,
  label,
  maxLength,
  minLength,
  StartContent,
  ...textFieldRestProps
}) => (
  <ReactAriaTextField
    {...textFieldRestProps}
    className={(values) => reactAriaClassNames(values, className, 'text-field')}
    maxLength={maxLength}
    minLength={minLength}
  >
    {({ isInvalid, isRequired }) => (
      <>
        <Label className='label'>
          {label} {isRequired && t('components.forms.requiredFields.mark')}
        </Label>

        <div className='input-wrapper'>
          {StartContent}

          <Input />

          {EndContent}
        </div>

        {isInvalid ? (
          <FieldError maxLength={maxLength} minLength={minLength} />
        ) : (
          description && (
            <Text className='description' slot='description'>
              {description}
            </Text>
          )
        )}
      </>
    )}
  </ReactAriaTextField>
)
