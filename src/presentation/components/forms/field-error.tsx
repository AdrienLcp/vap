import React from 'react'
import { FieldError as ReactAriaFieldError, type FieldErrorProps as ReactAriaFieldErrorProps } from 'react-aria-components'

import { t } from '@/infrastructure/i18n'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './field-error.sass'

type FieldErrorProps = ReactAriaFieldErrorProps & {
  maxLength?: number
}

export const FieldError: React.FC<FieldErrorProps> = ({ className }) => (
  <ReactAriaFieldError className={values => reactAriaClassNames(values, className, 'field-error')}>
    {({ defaultChildren, validationDetails, validationErrors }) => {
      if (validationDetails.customError) {
        return validationErrors.map(error => (
          <React.Fragment key={error}>
            {error}
          </React.Fragment>
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
        return t('components.forms.fieldError.tooLong')
      }

      if (validationDetails.tooShort) {
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
