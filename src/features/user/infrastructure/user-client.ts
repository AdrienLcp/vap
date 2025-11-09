import { USER_API_BASE_URL, USER_SEARCH_PARAMS } from '@/features/user/domain/user-constants'
import type {
  UserFilters,
  UserListResponse,
  UserRole,
  UserUpdateData,
  UserUpdateResponse
} from '@/features/user/domain/user-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const buildUsersFiltersQueryString = (filters?: UserFilters): string => {
  if (!filters) {
    return ''
  }

  const userFiltersQueryParams = new URLSearchParams()

  if (filters.email) {
    userFiltersQueryParams.set(USER_SEARCH_PARAMS.EMAIL, filters.email)
  }

  if (filters.roles) {
    userFiltersQueryParams.set(USER_SEARCH_PARAMS.ROLES, filters.roles.join(USER_SEARCH_PARAMS.ROLES_SEPARATOR))
  }

  return `?${userFiltersQueryParams.toString()}`
}

const findUsers = async (filters?: UserFilters): Promise<ClientResponse<UserListResponse>> => {
  try {
    const productFilterQueryString = buildUsersFiltersQueryString(filters)

    return await ApiClient.GET<UserListResponse>(`/${USER_API_BASE_URL}${productFilterQueryString}`)
  } catch (error) {
    console.error('Find users by email error:', error)
    return unknownError()
  }
}

const updateUserRole = async (
  userId: string,
  role: UserRole
): Promise<ClientResponse<UserUpdateResponse>> => {
  try {
    const encodedUserId = encodeURIComponent(userId)
    return await ApiClient.PATCH<UserUpdateResponse, UserUpdateData>(
      `/${USER_API_BASE_URL}/${encodedUserId}`,
      { role }
    )
  } catch (error) {
    console.error('Update user role error:', error)
    return unknownError()
  }
}

export const UserClient = {
  findUsers,
  updateUserRole
}
