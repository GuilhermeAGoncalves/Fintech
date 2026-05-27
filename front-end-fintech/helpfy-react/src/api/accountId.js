import client from './httpClient'

// GET /api/accounts/{userId}
export const listAccounts = async (userId) => {
  const { data } = await client.get(`/api/accounts/${userId}`)
  return data
}

// POST /api/accounts/{userId}
export const createAccount = async (userId, accountData) => {
  const { data } = await client.post(`/api/accounts/${userId}`, accountData)
  return data
}

// DELETE /api/accounts/{accountId}
export const deleteAccount = async (accountId) => {
  await client.delete(`/api/accounts/${accountId}`)
}
