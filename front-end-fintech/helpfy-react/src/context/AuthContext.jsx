import { createContext, useContext, useState } from 'react'
import { login as apiLogin } from '../api/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('helpfy_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    const u = {
      name: data.name || email.split('@')[0],
      email: data.email || email,
      plan: data.plan || 'Gratuito',
    }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    sessionStorage.removeItem('helpfy_user')
    localStorage.removeItem('userId')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
