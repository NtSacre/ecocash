import { AuthRepository } from '@/infrastructure/repositories/AuthRepository'
import { TokenManager } from '@/infrastructure/storage/TokenManager'
import type { RegisterDto, LoginMobileDto, VerifyOtpDto, ResendOtpDto } from '@/application/dto/AuthDto'
import type { IAuthSuccessResponse, IMeResponse } from '@/core/interfaces/IAuth'
import type { IUser } from '@/core/interfaces/IUser'

// Fusionne le "user" brut avec les tableaux "roles"/"permissions" fournis
// à côté par le backend — mêmes noms de champs, deux formes différentes.
function mergeUserWithRoles(payload: { user: IMeResponse['user']; roles: string[]; permissions: string[] }): IUser {
  return {
    ...payload.user,
    roles: payload.roles,
    permissions: payload.permissions,
  }
}

export const AuthService = {
  async register(payload: RegisterDto) {
    return AuthRepository.register(payload)
  },

  async loginMobile(payload: LoginMobileDto) {
    return AuthRepository.loginMobile(payload)
  },

  async verifyOtp(payload: VerifyOtpDto): Promise<IUser> {
    const response: IAuthSuccessResponse = await AuthRepository.verifyOtp(payload)
    TokenManager.setToken(response.access_token)
    return mergeUserWithRoles(response)
  },

  async resendOtp(payload: ResendOtpDto) {
    return AuthRepository.resendOtp(payload)
  },

  async fetchCurrentUser(): Promise<IUser> {
    const response = await AuthRepository.me()
    return mergeUserWithRoles(response)
  },

  async logout() {
    try {
      await AuthRepository.logout()
    } finally {
      TokenManager.clearToken()
    }
  },
}