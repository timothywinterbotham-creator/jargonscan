import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api, setToken, clearToken } from '../lib/api'

interface User {
  id: string
  email: string
  country: string
  createdAt: string
}

interface AuthContext {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, country: string, inviteCode: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.me()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null))
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const result = await api.login({ email, password }) as any
    if (result.token) setToken(result.token)
    setUser(result.user)
  }

  const signup = async (email: string, password: string, country: string, inviteCode: string) => {
    const result = await api.signup({ email, password, country, inviteCode }) as any
    if (result.token) setToken(result.token)
    setUser(result.user)
  }

  const logout = async () => {
    await api.logout()
    clearToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
