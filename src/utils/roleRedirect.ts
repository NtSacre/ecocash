import type { IUser } from '@/core/interfaces/IUser'
import { UserRole } from '@/core/enums/UserRole'
import { getPrimaryRole } from '@/utils/primaryRole'

export function getHomeRouteForUser(user: IUser): string {
  const role = getPrimaryRole(user)

  if (role === UserRole.SuperAdmin) return '/dashboard'
  if (role === UserRole.Citizen || role === UserRole.Partner || role === UserRole.Agent) return '/'

  return '/'
}