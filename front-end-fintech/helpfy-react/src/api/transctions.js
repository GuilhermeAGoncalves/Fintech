import client from './httpClient'

// GET /api/transactions/{userId}
export const listTransactions = async (userId) => {
  const { data } = await client.get(`/api/transactions/${userId}`)
  return data
}

// POST /api/transactions/create
export const createTransaction = async (transaction) => {
  const { data } = await client.post('/api/transactions/create', transaction)
  return data
}

// GET /api/categories
export const listCategories = async () => {
  const { data } = await client.get('/api/categories')
  return data
}
