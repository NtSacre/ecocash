import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import type { LoginMobileDto } from '@/application/dto/AuthDto'

export function useLoginMobile() {
  return useMutation({
    mutationFn: (payload: LoginMobileDto) => AuthService.loginMobile(payload),
  })
}