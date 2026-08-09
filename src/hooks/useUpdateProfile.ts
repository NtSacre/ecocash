import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import { useAuthContext } from '@/context/AuthContext'

export function useUpdateProfile() {
  const { setUser } = useAuthContext()

  return useMutation({
    mutationFn: (payload: { name?: string; mobile_money_number?: string; avatar?: string }) =>
      AuthService.updateProfile(payload),
    onSuccess: setUser,
  })
}