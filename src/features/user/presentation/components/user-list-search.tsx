'use client'

import { parseAsString, useQueryState } from 'nuqs'

import { t } from '@/infrastructure/i18n'
import { SearchField } from '@/presentation/components/forms/search-field'
import { useDebounceCallback } from '@/presentation/hooks/use-debounce'

type UserListSearchProps = {
  onChange: (value: string) => void
}

export const UserListSearch: React.FC<UserListSearchProps> = ({ onChange }) => {
  const [searchValue, setSearchValue] = useQueryState('user-email', parseAsString.withDefault(''))

  useDebounceCallback(searchValue, onChange)

  return (
    <SearchField
      label={t('user.list.search.label')}
      onChange={setSearchValue}
      placeholder={t('user.list.search.placeholder')}
      value={searchValue}
    />
  )
}
