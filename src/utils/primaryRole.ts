import type { IUser } from '@/core/interfaces/IUser'
import { UserRole } from '@/core/enums/UserRole'

const ROLE_PRIORITY: UserRole[] = [UserRole.SuperAdmin, UserRole.Partner, UserRole.Agent, UserRole.Citizen]

export function getPrimaryRole(user: IUser): UserRole | null {
  return ROLE_PRIORITY.find((role) => user.roles.includes(role)) ?? null
}