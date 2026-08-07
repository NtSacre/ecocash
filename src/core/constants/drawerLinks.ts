export interface DrawerLink {
  to: string
  label: string
  icon: string
}

export const APP_DRAWER_LINKS: DrawerLink[] = [
  { to: '/app/profil', label: 'Mon compte', icon: 'account_circle' },
  { to: '/app/aide', label: 'Aide', icon: 'help_outline' },
  { to: '/app/parametres', label: 'Paramètres', icon: 'settings' },
  { to: '/app/a-propos', label: 'À propos', icon: 'info' },
  { to: '/app/conditions', label: "Conditions d'utilisation", icon: 'description' },
]