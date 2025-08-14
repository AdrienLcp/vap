import React from 'react'
import { FieldError as ReactAriaFieldError, type FieldErrorProps as ReactAriaFieldErrorProps } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './field-error.sass'

type FieldErrorProps = ReactAriaFieldErrorProps & {
  maxLength?: number
  minLength?: number
}

export const FieldError: React.FC<FieldErrorProps> = ({ className, maxLength, minLength, ...fieldErrorRestProps }) => (
  <ReactAriaFieldError
    className={values => reactAriaClassNames(values, className, 'field-error')}
    {...fieldErrorRestProps}
  >
    {({ defaultChildren, validationDetails, validationErrors }) => {
      if (validationDetails.customError) {
        return validationErrors.map((errorMessage, index) => (
          <span key={index}>
            {errorMessage}
          </span>
        ))
      }

      if (validationDetails.badInput) {
        return t('components.forms.fieldError.badInput')
      }

      if (validationDetails.patternMismatch) {
        return t('components.forms.fieldError.patternMismatch')
      }

      if (validationDetails.rangeOverflow) {
        return t('components.forms.fieldError.rangeOverflow')
      }

      if (validationDetails.rangeUnderflow) {
        return t('components.forms.fieldError.rangeUnderflow')
      }

      if (validationDetails.stepMismatch) {
        return t('components.forms.fieldError.stepMismatch')
      }

      if (validationDetails.tooLong) {
        if (maxLength != null && minLength != null) {
          return t('components.forms.fieldError.lengthValues', { min: minLength, max: maxLength })
        }

        if (maxLength != null) {
          return t('components.forms.fieldError.tooLongValue', { max: maxLength })
        }

        return t('components.forms.fieldError.tooLong')
      }

      if (validationDetails.tooShort) {
        if (maxLength != null && minLength != null) {
          return t('components.forms.fieldError.lengthValues', { min: minLength, max: maxLength })
        }

        if (minLength != null) {
          return t('components.forms.fieldError.tooShortValue', { min: minLength })
        }

        return t('components.forms.fieldError.tooShort')
      }

      if (validationDetails.typeMismatch) {
        return t('components.forms.fieldError.typeMismatch')
      }

      if (validationDetails.valueMissing) {
        return t('components.forms.fieldError.valueMissing')
      }

      return defaultChildren
    }}
  </ReactAriaFieldError>
)
