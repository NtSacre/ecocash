import { STORAGE_KEYS } from '@/core/constants/storageKeys'

// Stocké en localStorage car notre backend est JWT stateless (Bearer token,
// pas de cookie httpOnly côté Laravel). Compromis assumé pour le MVP :
// exposé à une éventuelle faille XSS, à durcir plus tard si besoin
// (ex: passer par un cookie httpOnly signé par un petit backend proxy).
export const TokenManager = {
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
  },
  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token)
  },
  clearToken(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN)
  },
}