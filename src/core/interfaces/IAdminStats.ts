export interface IAdminStats {
  listings: { active: number; suspended: number; closed: number }
  partners: { total: number; pending: number; new_this_month: number }
  agents: { total: number }
  citizens: { total: number; new_this_month: number }
  operations: {
    awaiting_slot: number
    awaiting_assignment: number
    in_progress: number
    awaiting_partner_validation: number
  }
  volume: { total_collected: number; completed_collections: number }
  finance: {
    total_commission: number
    total_paid_to_citizens: number
    pending_payments_count: number
    pending_payments_amount: number
  }
  agent_workload: { id: number; name: string; active_load: number }[]
}