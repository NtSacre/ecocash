import { AuthRepository } from '@/infrastructure/repositories/AuthRepository'
import { TokenManager } from '@/infrastructure/storage/TokenManager'
import type { RegisterDto, LoginMobileDto, VerifyOtpDto, ResendOtpDto } from '@/application/dto/AuthDto'
import type { IAuthSuccessResponse } from '@/core/interfaces/IAuth'
import type { IUser } from '@/core/interfaces/IUser'

function mergeAuthSuccess(response: IAuthSuccessResponse): IUser {
  TokenManager.setToken(response.access_token)
  return {
    ...response.user,
    roles: response.roles,
    permissions: response.permissions,
  }
}

export const AuthService = {
  /** Étape 1 inscription : crée le compte, déclenche l'envoi d'un OTP. */
  async register(payload: RegisterDto) {
    return AuthRepository.register(payload)
  },

  /** Étape 1 connexion : vérifie le téléphone, déclenche l'envoi d'un OTP. */
  async loginMobile(payload: LoginMobileDto) {
    return AuthRepository.loginMobile(payload)
  },

  /** Étape 2 commune (inscription ET connexion) : valide le code, retourne le token. */
  async verifyOtp(payload: VerifyOtpDto): Promise<IUser> {
    const response = await AuthRepository.verifyOtp(payload)
    return mergeAuthSuccess(response)
  },

  async resendOtp(payload: ResendOtpDto) {
    return AuthRepository.resendOtp(payload)
  },

  async fetchCurrentUser() {
    return AuthRepository.me()
  },

  async logout() {
    try {
      await AuthRepository.logout()
    } finally {
      TokenManager.clearToken()
    }
  },
}