import { createContext, useContext, useState } from 'react'
<<<<<<< HEAD
import { api } from '../api'
=======
import { login as apiLogin, register as apiRegister } from '../api/users'
>>>>>>> e71aef873402a2fd456eb12c59f6727139709345

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
<<<<<<< HEAD
    const s = sessionStorage.getItem('helpfy_user')
    return s ? JSON.parse(s) : null
  })

  const login = async (email) => {
    const users = await api.getUsers()
    if (!users || users.length === 0) throw new Error('Nenhum usuário encontrado. Crie uma conta primeiro.')
    const u = { userid: users[0].userid, name: email.split('@')[0], email }
=======
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
>>>>>>> e71aef873402a2fd456eb12c59f6727139709345
    sessionStorage.setItem('helpfy_user', JSON.stringify(u))
    setUser(u)
  }

  const register = async (name, email, password) => {
<<<<<<< HEAD
    const data = await api.createUser({ name, email, password })
    const u = { userid: data.userid, name, email }
=======
    const data = await apiRegister(name, email, password)
    const u = {
      userid: data.userid,
      name,
      email,
    }
>>>>>>> e71aef873402a2fd456eb12c59f6727139709345
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
