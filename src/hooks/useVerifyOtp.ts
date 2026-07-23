import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import { useAuthContext } from '@/context/AuthContext'
import type { VerifyOtpDto } from '@/application/dto/AuthDto'

export function useVerifyOtp() {
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: (payload: VerifyOtpDto) => AuthService.verifyOtp(payload),
    onSuccess: setUser,
  })
}