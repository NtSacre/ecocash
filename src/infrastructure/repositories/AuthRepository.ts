import { apiClient } from '@/infrastructure/http/apiClient'
import { AUTH_ROUTES } from '@/core/constants/authRoutes'
import type { RegisterDto, LoginMobileDto, VerifyOtpDto, ResendOtpDto } from '@/application/dto/AuthDto'
import type { IRequiresOtpResponse, IAuthSuccessResponse, IMeResponse } from '@/core/interfaces/IAuth'
import type { IUser } from '@/core/interfaces/IUser'


export const AuthRepository = {
  async register(payload: RegisterDto): Promise<IRequiresOtpResponse> {
    const { data } = await apiClient.post<IRequiresOtpResponse>(AUTH_ROUTES.REGISTER, payload)
    return data
  },
  async loginMobile(payload: LoginMobileDto): Promise<IRequiresOtpResponse> {
    const { data } = await apiClient.post<IRequiresOtpResponse>(AUTH_ROUTES.LOGIN_MOBILE, payload)
    return data
  },
  async verifyOtp(payload: VerifyOtpDto): Promise<IAuthSuccessResponse> {
    const { data } = await apiClient.post<IAuthSuccessResponse>(AUTH_ROUTES.VERIFY_OTP, payload)
    return data
  },
  async resendOtp(payload: ResendOtpDto): Promise<IRequiresOtpResponse> {
    const { data } = await apiClient.post<IRequiresOtpResponse>(AUTH_ROUTES.RESEND_OTP, payload)
    return data
  },
async me(): Promise<IMeResponse> {
  const { data } = await apiClient.get<IMeResponse>(AUTH_ROUTES.ME)
  return data
},
  async logout(): Promise<void> {
    await apiClient.post(AUTH_ROUTES.LOGOUT)
  },

  async updateProfile(payload: { name?: string; mobile_money_number?: string; avatar?: string }): Promise<IUser> {
  const { data } = await apiClient.put<IUser>(AUTH_ROUTES.ME, payload)
  return data
},
}