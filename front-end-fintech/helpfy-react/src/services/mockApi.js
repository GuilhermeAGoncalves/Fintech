// Mock API — simula chamadas REST com localStorage
// Quando houver backend, substituir cada função por fetch('/api/...')

const delay = (ms = 180) => new Promise(r => setTimeout(r, ms))

const load = (key, seed) => {
  const raw = localStorage.getItem(key)
  if (raw) return JSON.parse(raw)
  localStorage.setItem(key, JSON.stringify(seed))
  return seed
}
const save = (key, data) => localStorage.setItem(key, JSON.stringify(data))
const nextId = items => (items.length ? Math.max(...items.map(i => i.id)) + 1 : 1)

// ── Dados iniciais ──────────────────────────────────────────

const SEED_GASTOS = [
  { id: 1, descricao: 'Almoço churrascaria', valor: 37.50, categoria: 'Alimentação', conta: 'Nubank', data: '2025-10-12' },
  { id: 2, descricao: 'Compra mercado',      valor: 46.00, categoria: 'Mercado',     conta: 'Nubank', data: '2025-10-13' },
  { id: 3, descricao: 'Locomoção UBER',      valor: 25.90, categoria: 'Transporte',  conta: 'Nubank', data: '2025-10-10' },
  { id: 4, descricao: 'Fatura cartão',       valor: 1240,  categoria: 'Dívida',      conta: 'Nubank', data: '2025-10-02' },
]

const SEED_RECEITAS = [
  { id: 1, descricao: 'Salário mensal',  valor: 6000,  categoria: 'Salário', conta: 'Itaú',     data: '2025-10-08' },
  { id: 2, descricao: 'Hora extra',      valor: 450,   categoria: 'Salário', conta: 'Itaú',     data: '2025-10-12' },
  { id: 3, descricao: 'Venda de roupas', valor: 250,   categoria: 'Vendas',  conta: 'Nubank',   data: '2025-10-13' },
  { id: 4, descricao: 'Pix recebido',    valor: 87.50, categoria: 'Outros',  conta: 'Inter',    data: '2025-10-10' },
  { id: 5, descricao: 'Venda de bolo',   valor: 35.50, categoria: 'Vendas',  conta: 'Carteira', data: '2025-10-05' },
]

const SEED_OBJETIVOS = [
  { id: 1, nome: 'Viagem para Europa',    meta: 12000, atual: 7200,  deadline: '2026-07', icone: '✈️' },
  { id: 2, nome: 'Reserva de emergência', meta: 15000, atual: 8400,  deadline: '2026-12', icone: '🛡️' },
  { id: 3, nome: 'Notebook novo',         meta: 5500,  atual: 2800,  deadline: '2026-03', icone: '💻' },
  { id: 4, nome: 'Entrada apartamento',   meta: 60000, atual: 22000, deadline: '2027-12', icone: '🏠' },
]

const SEED_INVESTIMENTOS = [
  { id: 1, nome: 'Tesouro IPCA+ 2029', tipo: 'Renda fixa', valor: 4280.10, rentabilidade: 5.2,  lucro: 280.10 },
  { id: 2, nome: 'CDB Banco Inter',     tipo: 'Renda fixa', valor: 3450.00, rentabilidade: 4.1,  lucro: 150.00 },
  { id: 3, nome: 'ITSA4',               tipo: 'Ações',      valor: 2150.50, rentabilidade: 8.7,  lucro: 178.50 },
  { id: 4, nome: 'BOVA11',              tipo: 'ETF',        valor: 1620.00, rentabilidade: -2.3, lucro: -38.00 },
  { id: 5, nome: 'Bitcoin',             tipo: 'Cripto',     valor: 980.20,  rentabilidade: 12.4, lucro: 108.20 },
]

const SEED_DIVIDAS = [
  { id: 1, nome: 'Cartão Nubank',      total: 3450, pago: 2210, parcela: 410, parcelas: '4 de 12' },
  { id: 2, nome: 'Financiamento moto', total: 8800, pago: 4400, parcela: 550, parcelas: '8 de 16' },
  { id: 3, nome: 'Empréstimo amigo',   total: 1500, pago: 500,  parcela: 250, parcelas: '2 de 6'  },
]

// ── Factory de API ──────────────────────────────────────────
const makeCrud = (key, seed) => ({
  list:   async ()         => { await delay(); return load(key, seed) },
  create: async (data)     => { await delay(); const items = load(key, seed); const item = { ...data, id: nextId(items) }; save(key, [...items, item]); return item },
  update: async (id, data) => { await delay(); const items = load(key, seed).map(i => i.id === id ? { ...i, ...data, id } : i); save(key, items); return items.find(i => i.id === id) },
  remove: async (id)       => { await delay(); save(key, load(key, seed).filter(i => i.id !== id)) },
})

export const gastosApi      = makeCrud('helpfy_gastos',       SEED_GASTOS)
export const receitasApi    = makeCrud('helpfy_receitas',     SEED_RECEITAS)
export const objetivosApi   = makeCrud('helpfy_objetivos',    SEED_OBJETIVOS)
export const investApi      = makeCrud('helpfy_investimentos', SEED_INVESTIMENTOS)
export const dividasApi     = makeCrud('helpfy_dividas',      SEED_DIVIDAS)
