import type { HomeActivity } from '@/types/content'

// Contenu de démonstration — à remplacer par de vraies données API
// (useResponses, usePayments...) une fois les hooks branchés sur le backend.
export const avatars = {
  main: 'https://i.pravatar.cc/150?img=12',
}

export const homeActivities: HomeActivity[] = [
  {
    id: 'plastic',
    title: 'Plastique PET collecté',
    meta: "Aujourd'hui, 09:30",
    amount: '+2 500 CFA',
    status: 'Payé',
    icon: 'recycling',
    iconClass: 'bg-primary-container/10 text-primary',
  },
  {
    id: 'glass',
    title: 'Verre collecté',
    meta: 'Hier, 16:10',
    amount: '+1 200 CFA',
    status: 'Payé',
    icon: 'wine_bar',
    iconClass: 'bg-tertiary-container/20 text-tertiary',
  },
]