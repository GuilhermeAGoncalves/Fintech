import client from './httpClient'

export const listTransactions = async (params = {}) => {
  const { data } = await client.get('/api/transactions', { params })
  return data
}

export const listReceitas = async () => {
  const { data } = await client.get('/api/transactions', { params: { tipo: 'RECEITA' } })
  return data
}

export const listGastos = async () => {
  const { data } = await client.get('/api/transactions', { params: { tipo: 'GASTO' } })
  return data
}

export const listByCategories = async (categories) => {
  const { data } = await client.get('/api/transactions', { params: { tipo: 'GASTO' } })
  return data
}

export const getTransaction = async (id) => {
  const { data } = await client.get(`/api/transactions/${id}`)
  return data
}

export const createTransaction = async (transaction) => {
  const { data } = await client.post('/api/transactions', transaction)
  return data
}

export const updateTransaction = async (id, updates) => {
  const { data } = await client.put(`/api/transactions/${id}`, updates)
  return data
}

export const deleteTransaction = async (id) => {
  await client.delete(`/api/transactions/${id}`)
}
