import { SearchIcon, XIcon } from 'lucide-react'
import {
  Input,
  Label,
  SearchField as ReactAriaSearchField,
  type SearchFieldProps as ReactAriaSearchFieldProps,
  Text
} from 'react-aria-components'

import { FieldError } from '@/presentation/components/forms/field-error'
import { Spinner } from '@/presentation/components/ui/loaders/spinner'
import { Button } from '@/presentation/components/ui/pressables/button'
import { reactAriaClassNames } from '@/presentation/utils/react-aria-utils'

import './search-field.sass'

export type SearchFieldProps = ReactAriaSearchFieldProps & {
  description?: string
  isPending?: boolean
  label: React.ReactNode
  placeholder?: string
}

export const SearchField: React.FC<SearchFieldProps> = ({
  className,
  description,
  isDisabled,
  isPending,
  label,
  ...searchFieldRestProps
}) => (
  <ReactAriaSearchField
    {...searchFieldRestProps}
    className={(values) => reactAriaClassNames(values, className, 'search-field')}
    isDisabled={isDisabled || isPending}
  >
    {({ isInvalid, state }) => (
      <>
        <Label className='label'>{label}</Label>

        <div className='input-wrapper'>
          <div className='search-icon'>{isPending ? <Spinner /> : <SearchIcon aria-hidden />}</div>

          <Input />

          <Button
            className='delete-icon-button'
            Icon={<XIcon aria-hidden />}
            isPending={isPending}
            onPress={() => state.setValue('')}
            variant='transparent'
          />
        </div>

        {isInvalid ? (
          <FieldError />
        ) : (
          description && (
            <Text className='description' slot='description'>
              {description}
            </Text>
          )
        )}
      </>
    )}
  </ReactAriaSearchField>
)
