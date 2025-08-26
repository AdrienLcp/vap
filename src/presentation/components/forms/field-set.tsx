import classNames from 'classnames'

import './field-set.sass'

type FieldSetProps = Omit<React.ComponentProps<'fieldset'>, 'disabled'> & {
  isDisabled?: boolean
  legend?: string
}

export const FieldSet: React.FC<FieldSetProps> = ({
  children,
  className,
  isDisabled,
  legend,
  ...fieldSetRestProps
}) => (
  <fieldset
    className={classNames('field-set', className)}
    disabled={isDisabled}
    {...fieldSetRestProps}
  >
    {legend && <legend>{legend}</legend>}

    {children}
  </fieldset>
)
