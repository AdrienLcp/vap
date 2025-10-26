import { CircleAlertIcon } from 'lucide-react'

import { getUniqueStringsArray } from '@/utils/array-utils'

import './form-error.sass'

type FormErrorProps = {
  errors?: string | string[]
}

export const FormError: React.FC<FormErrorProps> = ({ errors }) => {
  const isErrorsArray = Array.isArray(errors)

  if (!errors || (isErrorsArray && errors.length === 0)) {
    return null
  }

  return (
    <div className='form-error'>
      <CircleAlertIcon aria-hidden />

      <p>
        {isErrorsArray
          ? getUniqueStringsArray(errors).map((error) => <span key={error}>{error}</span>)
          : errors}
      </p>
    </div>
  )
}
