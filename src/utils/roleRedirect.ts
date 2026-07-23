import type { IUser } from '@/core/interfaces/IUser'
import { UserRole } from '@/core/enums/UserRole'

export function getHomeRouteForUser(user: IUser): string {
  if (user.roles.includes(UserRole.Citizen)) return '/app'
  if ([UserRole.Partner, UserRole.Agent, UserRole.SuperAdmin].some((r) => user.roles.includes(r))) {
    return '/dashboard'
  }
  return '/'
}