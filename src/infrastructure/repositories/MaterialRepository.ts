import { apiClient } from '@/infrastructure/http/apiClient'
import type { IMaterialOption } from '@/core/interfaces/IMaterialOption'

// ⚠️ Route supposée /materials, non confirmée — à vérifier avec route:list
// si le formulaire échoue à charger les options.
export const MaterialRepository = {
  async getAll(): Promise<IMaterialOption[]> {
    const { data } = await apiClient.get<IMaterialOption[]>('/materials')
    return data
  },
}