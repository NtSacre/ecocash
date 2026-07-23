import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { AuthService } from '@/application/services/AuthService'
import { useAuthContext } from '@/context/AuthContext'

export function useLogout() {
  const { clearSession } = useAuthContext()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => AuthService.logout(),
    onSettled: () => {
      clearSession()
      navigate('/login')
    },
  })
}