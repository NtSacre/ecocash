import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { Loader } from '@/components/Loader/Loader'
import { getHomeRouteForUser } from '@/utils/roleRedirect'

export function GuestRoute() {
  const { isAuthenticated, isLoading, user } = useAuthContext()

  if (isLoading) return <Loader label="Vérification de la session..." />
  if (isAuthenticated && user) return <Navigate to={getHomeRouteForUser(user)} replace />

  return <Outlet />
}