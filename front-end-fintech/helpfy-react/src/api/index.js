const BASE = 'http://localhost:8080'
const H = { 'Content-Type': 'application/json' }

const ok = async (r) => {
  if (!r.ok) { const t = await r.text(); throw new Error(t || r.statusText) }
  return r
}

export const api = {
  getUsers:          ()      => fetch(`${BASE}/api/users`).then(r => r.json()),
  createUser:        (b)     => fetch(`${BASE}/api/users`, { method: 'POST', headers: H, body: JSON.stringify(b) }).then(ok).then(r => r.json()),
  getAccounts:       (uid)   => fetch(`${BASE}/api/accounts/${uid}`).then(r => r.json()),
  createAccount:     (uid,b) => fetch(`${BASE}/api/accounts/${uid}`, { method: 'POST', headers: H, body: JSON.stringify(b) }).then(ok).then(r => r.json()),
  deleteAccount:     (aid)   => fetch(`${BASE}/api/accounts/${aid}`, { method: 'DELETE' }).then(ok),
  getTransactions:   (uid)   => fetch(`${BASE}/api/transactions/${uid}`).then(r => r.json()),
  createTransaction: (b)     => fetch(`${BASE}/api/transactions/create`, { method: 'POST', headers: H, body: JSON.stringify(b) }).then(ok),
  getCategories:     ()      => fetch(`${BASE}/api/categories`).then(r => r.json()),
}
