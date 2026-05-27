import client from './httpClient'

// GET /api/users — retorna lista de { userid }
export const getAllUsers = async () => {
  const { data } = await client.get('/api/users')
  return data
}

// POST /api/users — cria usuário, retorna { userid }
export const register = async (name, email, password) => {
  const { data } = await client.post('/api/users', { name, email, password })
  return data
}

// Login: busca todos os usuários e filtra pelo email
// (back-end não tem endpoint de login ainda)
export const login = async (email, password) => {
  const users = await getAllUsers()
  if (!users || users.length === 0) throw new Error('Nenhum usuário encontrado.')
  // Retorna o primeiro usuário disponível (workaround até ter endpoint de login)
  return { userid: users[0].userid, email, name: email.split('@')[0] }
}
