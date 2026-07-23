import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import type { RegisterDto } from '@/application/dto/AuthDto'

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterDto) => AuthService.register(payload),
  })
}