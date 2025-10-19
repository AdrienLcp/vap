'use client'

import { useState } from 'react'

import { t } from '@/infrastructure/i18n'
import { SearchField } from '@/presentation/components/forms/search-field'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'

type UserListSearchProps = {
  isPending: boolean
  onChange: (value: string) => void
}

export const UserListSearch: React.FC<UserListSearchProps> = ({ isPending, onChange }) => {
  const [searchValue, setSearchValue] = useState<string>('')

  useDebounceCallback(searchValue, onChange)

  return (
    <SearchField
      isPending={isPending}
      label={t('user.list.search.label')}
      onChange={setSearchValue}
      placeholder={t('user.list.search.placeholder')}
      value={searchValue}
    />
  )
}
