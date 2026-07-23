import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import { Loader } from '@/components/Loader/Loader'

export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuthContext()

  if (isLoading) return <Loader label="Vérification de la session..." />
  if (!isAuthenticated) return <Navigate to="/login" replace />

  return <Outlet />
}