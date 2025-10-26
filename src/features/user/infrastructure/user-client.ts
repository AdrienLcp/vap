import { USER_API_BASE_URL, USER_SEARCH_PARAMS } from '@/features/user/domain/user-constants'
import type {
  UserListResponse,
  UserRole,
  UserUpdateData,
  UserUpdateResponse
} from '@/features/user/domain/user-entities'
import { ApiClient, type ClientResponse, unknownError } from '@/infrastructure/api/api-client'

const findUsers = async (email?: string): Promise<ClientResponse<UserListResponse>> => {
  try {
    const userListSearchParams = new URLSearchParams()

    if (email) {
      userListSearchParams.set(USER_SEARCH_PARAMS.EMAIL, email)
    }

    return await ApiClient.GET<UserListResponse>(
      `/${USER_API_BASE_URL}?${userListSearchParams.toString()}`
    )
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
