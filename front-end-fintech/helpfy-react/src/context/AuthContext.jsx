import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

const FAKE_USER = { name: 'Lucca Modena', email: 'lucca@helpfy.com.br', plan: 'Gratuito' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('helpfy_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = (email, _password) => {
    const u = { ...FAKE_USER, email }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    sessionStorage.removeItem('helpfy_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
