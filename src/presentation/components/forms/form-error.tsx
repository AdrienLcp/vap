import { CircleAlertIcon } from 'lucide-react'

import type { ValidationErrors } from '@/presentation/utils/react-aria-utils'

import './form-error.sass'

type FormErrorProps<T extends PropertyKey> = {
  validationErrors?: ValidationErrors<T> | null
}

export function FormError <T extends PropertyKey> ({ validationErrors }: FormErrorProps<T>) {
  if (!validationErrors?.form) {
    return null
  }

  return (
    <div className='form-error'>
      <CircleAlertIcon />

      <p>
        {Array.isArray(validationErrors.form)
          ? validationErrors.form.map((error, index) => <span key={index}>{error}</span>)
          : validationErrors.form
        }
      </p>
    </div>
  )
}
