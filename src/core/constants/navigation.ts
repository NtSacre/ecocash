import type { BottomNavItem } from "@/components/Loader/BottomNav/BottomNav";

// Nav du particulier (citoyen) — écrans mobiles avec bottom nav.
export const CITIZEN_NAV_ITEMS: BottomNavItem[] = [
  { to: '/app', label: 'Accueil', icon: 'home', filled: true, end: true },
  { to: '/app/annonces', label: 'Vendre', icon: 'add_circle' },
  { to: '/app/decouvrir', label: 'Découvrir', icon: 'menu_book' },
  { to: '/app/profil', label: 'Compte', icon: 'person' },
]