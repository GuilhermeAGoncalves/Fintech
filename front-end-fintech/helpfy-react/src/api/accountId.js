import client from './httpClient'

export const listAccounts = async (userId) => {
  const { data } = await client.get(`/api/accounts/user/${userId}`)
  return data
}

export const getAccount = async (accountId) => {
  const { data } = await client.get(`/api/accounts/${accountId}`)
  return data
}

export const createAccount = async (userId, accountData) => {
  const { data } = await client.post(`/api/accounts/${userId}`, accountData)
  return data
}

export const updateAccount = async (accountId, updates) => {
  const { data } = await client.put(`/api/accounts/${accountId}`, updates)
  return data
}

export const deleteAccount = async (accountId) => {
  await client.delete(`/api/accounts/${accountId}`)
}
