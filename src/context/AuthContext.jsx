import { createContext, useContext, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = sessionStorage.getItem('helpfy_user')
    return s ? JSON.parse(s) : null
  })

  const login = async (email) => {
    const users = await api.getUsers()
    if (!users || users.length === 0) throw new Error('Nenhum usuário encontrado. Crie uma conta primeiro.')
    const u = { userid: users[0].userid, name: email.split('@')[0], email }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const register = async (name, email, password) => {
    const data = await api.createUser({ name, email, password })
    const u = { userid: data.userid, name, email }
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
