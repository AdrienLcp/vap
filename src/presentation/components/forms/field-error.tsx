import { type FieldErrorProps, FieldError as ReactAriaFieldError } from 'react-aria-components'

import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './field-error.sass'

export const FieldError: React.FC<FieldErrorProps> = ({ className }) => (
  <ReactAriaFieldError className={values => reactAriaClassNames(values, className, 'field-error')}>
    {({ validationErrors }) => validationErrors.map(error => (
      <p key={error}>
        {error}
      </p>
    ))}
  </ReactAriaFieldError>
)
