import { createContext, useContext, useState } from 'react'
import { api } from '../api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const s = sessionStorage.getItem('helpfy_user')
    if (!s) return null
    const parsed = JSON.parse(s)
    if (!parsed.userid) {
      sessionStorage.removeItem('helpfy_user')
      return null
    }
    return parsed
  })

  const login = async (email) => {
    const users = await api.getUsers()
    if (!users || users.length === 0) throw new Error('Nenhum usuário encontrado. Crie uma conta primeiro.')
    const found = users[0]
    const id = found.userid ?? found.userId ?? found.id
    const u = { userid: id, name: email.split('@')[0], email }
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const register = async (name, email, password) => {
    const data = await api.createUser({ name, email, password })
    const id = data.userid ?? data.userId ?? data.id
    const u = { userid: id, name, email }
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
