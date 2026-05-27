import client from './httpClient'

export const login = async (email, password) => {
  const { data } = await client.post('/api/users/login', { email, password })
  localStorage.setItem('userId', data.token)
  return data
}

export const register = async (email, password, name) => {
  const { data } = await client.post('/api/users/register', { email, password, name })
  return data
}

export const getProfile = async (userId) => {
  const { data } = await client.get(`/api/users/${userId}`)
  return data
}

export const updateProfile = async (userId, updates) => {
  const { data } = await client.put(`/api/users/${userId}`, updates)
  return data
}
