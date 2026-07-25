export interface IAdminStats {
  listings: { active: number; suspended: number; closed: number }
  partners: { total: number; pending: number }
  agents: number
  citizens: number
}