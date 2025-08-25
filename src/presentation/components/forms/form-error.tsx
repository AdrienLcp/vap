import { CircleAlertIcon } from 'lucide-react'

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
          ? errors.map((error, index) => <span key={index}>{error}</span>)
          : errors
        }
      </p>
    </div>
  )
}
