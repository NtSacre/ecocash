import { apiClient } from '@/infrastructure/http/apiClient'
import type { IUser } from '@/core/interfaces/IUser'

// Réutilise /admin/partners/pending vu plus tôt — mais on veut TOUS les
// partenaires (actifs inclus), pas juste ceux en attente.
// ⚠️ Route /admin/partners supposée — à vérifier avec route:list --path=admin/partners
export const AdminPartnerRepository = {
  async getAll(): Promise<IUser[]> {
    const { data } = await apiClient.get<IUser[]>('/admin/partners')
    return data
  },
}