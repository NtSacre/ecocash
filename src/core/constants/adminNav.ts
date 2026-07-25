export interface AdminNavItem {
  to: string
  label: string
  icon: string
  end?: boolean
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { to: '/dashboard', label: 'Tableau de bord', icon: 'dashboard', end: true },
  { to: '/dashboard/annonces', label: 'Annonces', icon: 'campaign' },
  { to: '/dashboard/partenaires', label: 'Partenaires', icon: 'handshake' },
  { to: '/dashboard/agents', label: 'Agents', icon: 'badge' },
  { to: '/dashboard/creneaux', label: 'Créneaux de collecte', icon: 'event' },
  { to: '/dashboard/paiements', label: 'Paiements', icon: 'payments' },
  { to: '/dashboard/assignations', label: 'Assignations', icon: 'assignment_ind' },
]