import type { BottomNavItem } from '@/components/Loader/BottomNav/BottomNav'
import { UserRole } from '@/core/enums/UserRole'

const CITIZEN_NAV_ITEMS: BottomNavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home', filled: true, end: true },
  { to: '/app/annonces', label: 'Vendre', icon: 'add_circle' },
  { to: '/app/suivi', label: 'Suivi', icon: 'receipt_long' },
  { to: '/app/decouvrir', label: 'Découvrir', icon: 'menu_book' },
  { to: '/app/profil', label: 'Compte', icon: 'person' },
]

const PARTNER_NAV_ITEMS: BottomNavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home', filled: true, end: true },
  { to: '/app/mes-annonces', label: 'Annonces', icon: 'campaign' },
  { to: '/app/suivi', label: 'Suivi', icon: 'receipt_long' },
  { to: '/app/decouvrir', label: 'Découvrir', icon: 'menu_book' },
  { to: '/app/profil', label: 'Compte', icon: 'person' },
]

const AGENT_NAV_ITEMS: BottomNavItem[] = [
  { to: '/', label: 'Accueil', icon: 'home', filled: true, end: true },
  { to: '/app/collectes', label: 'Collectes', icon: 'local_shipping' },
  { to: '/app/annonces', label: 'Vendre', icon: 'add_circle' },
  { to: '/app/suivi', label: 'Suivi', icon: 'receipt_long' },
  { to: '/app/profil', label: 'Compte', icon: 'person' },
]

export function getNavItemsForRole(role: UserRole | null): BottomNavItem[] {
  switch (role) {
    case UserRole.Partner:
      return PARTNER_NAV_ITEMS
    case UserRole.Agent:
      return AGENT_NAV_ITEMS
    default:
      return CITIZEN_NAV_ITEMS
  }
}