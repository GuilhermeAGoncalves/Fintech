import { createContext, useContext, useState } from 'react'
import { login as apiLogin, register as apiRegister } from '../api/users'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = sessionStorage.getItem('helpfy_user')
    return stored ? JSON.parse(stored) : null
  })

  const login = async (email, password) => {
    const data = await apiLogin(email, password)
    const u = {
      userid: data.userid,
      name: data.name || email.split('@')[0],
      email: data.email || email,
    }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const register = async (name, email, password) => {
    const data = await apiRegister(name, email, password)
    const u = {
      userid: data.userid,
      name,
      email,
    }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const logout = () => {
    sessionStorage.removeItem('helpfy_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
