export const UserRole = {
  SuperAdmin : 'Super-Admin',
  Partner : 'Partner',
  Agent : 'Agent',
  Citizen : 'Citizen',
} as const

export type UserRole = (typeof UserRole)[keyof typeof UserRole]