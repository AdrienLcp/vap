import { AuthRepository } from '@/auth/auth-repository'

const findUser = async () => {
  return await AuthRepository.findUser()
}

export const AuthService = {
  findUser
}
