import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { IUser } from '@/core/interfaces/IUser'
import { TokenManager } from '@/infrastructure/storage/TokenManager'
import { AuthService } from '@/application/services/AuthService'

interface AuthContextValue {
  user: IUser | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: IUser | null) => void
  clearSession: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = TokenManager.getToken()

    if (!token) {
      setIsLoading(false)
      return
    }

    AuthService.fetchCurrentUser()
      .then(setUser)
      .catch(() => TokenManager.clearToken())
      .finally(() => setIsLoading(false))
  }, [])

  const clearSession = () => {
    TokenManager.clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, setUser, clearSession }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuthContext doit être utilisé dans un AuthProvider')
  return ctx
}