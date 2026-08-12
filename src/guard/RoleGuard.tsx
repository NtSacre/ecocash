import { Navigate, Outlet } from 'react-router-dom'
import { useAuthContext } from '@/context/AuthContext'
import type { UserRole } from '@/core/enums/UserRole'

interface RoleGuardProps {
  allowedRoles: UserRole[]
}

export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useAuthContext()

  const hasAccess = user?.roles?.some((roleName) => allowedRoles.includes(roleName as UserRole)) ?? false

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}