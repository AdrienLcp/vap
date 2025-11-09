'use client'

import { useState } from 'react'

import { t } from '@/infrastructure/i18n'
import { SearchField } from '@/presentation/components/forms/search-field'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'

type UserSearchProps = {
  isDisabled: boolean
  onChange: (value: string) => void
  value: string
}

export const UserSearch: React.FC<UserSearchProps> = ({ isDisabled, onChange, value }) => {
  const [searchValue, setSearchValue] = useState(value)

  useDebounceCallback(searchValue, onChange)

  return (
    <SearchField
      isDisabled={isDisabled}
      label={t('user.list.search.label')}
      onChange={setSearchValue}
      placeholder={t('user.list.search.placeholder')}
      value={searchValue}
    />
  )
}
