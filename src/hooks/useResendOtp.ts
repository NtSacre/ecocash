import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import type { ResendOtpDto } from '@/application/dto/AuthDto'

export function useResendOtp() {
  return useMutation({
    mutationFn: (payload: ResendOtpDto) => AuthService.resendOtp(payload),
  })
}