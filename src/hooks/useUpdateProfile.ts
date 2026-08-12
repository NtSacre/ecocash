import { useMutation } from '@tanstack/react-query'
import { AuthService } from '@/application/services/AuthService'
import { useAuthContext } from '@/context/AuthContext'

interface UpdateProfilePayload {
  name?: string
  email?: string
  mobile_money_number?: string
  coverage_zone?: string
  preferred_otp_channel?: string
  notifications_enabled?: boolean
  avatar?: string
}

export function useUpdateProfile() {
  const { user, setUser } = useAuthContext()

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => AuthService.updateProfile(payload),
    onSuccess: (updatedUser) => {
      if (!user) return

      // Le backend ne renvoie pas toujours roles/permissions sur cet endpoint
      // (contrairement à /me ou /verify-otp) — on les préserve explicitement
      // depuis le contexte existant plutôt que de faire confiance à la réponse.
      setUser({
        ...user,
        ...updatedUser,
        roles: user.roles,
        permissions: user.permissions,
      })
    },
  })
}