import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listTransactions } from '../api/transctions'
import { listAccounts } from '../api/accountId'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(Number(n) || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const fmtDate = iso => { if (!iso) return '—'; const d = new Date(iso); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` }

export default function Dashboard() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user?.userid) return
    Promise.all([
      listAccounts(user.userid),
      listTransactions(user.userid),
    ])
      .then(([accs, txs]) => {
        setAccounts(Array.isArray(accs) ? accs : [])
        setTransactions(Array.isArray(txs) ? txs : [])
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.userid])

  const totalBalance   = accounts.reduce((s, a) => s + Number(a.initialBalance || 0), 0)
  const totalReceitas  = transactions.filter(t => Number(t.amount) > 0).reduce((s, t) => s + Number(t.amount), 0)
  const totalGastos    = transactions.filter(t => Number(t.amount) < 0).reduce((s, t) => s + Math.abs(Number(t.amount)), 0)
  const recent = [...transactions].sort((a, b) => new Date(b.dtTransaction) - new Date(a.dtTransaction)).slice(0, 6)

  if (loading) return <div style={{ padding: 40, color: 'var(--ink-3)' }}>Carregando…</div>

  const firstName = user?.name?.split(' ')[0] || 'Usuário'

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Olá, {firstName} 👋
        </h2>
        <p style={{ color: 'var(--ink-3)', marginTop: 4 }}>Aqui está um resumo das suas finanças.</p>
      </div>

      <div className="grid grid-bal">
        <div className="balance-hero">
          <div className="label">Saldo consolidado</div>
          <div className="balance-val">{brl(totalBalance)}</div>
          <div className="balance-delta">{accounts.length} conta{accounts.length !== 1 ? 's' : ''} ativa{accounts.length !== 1 ? 's' : ''}</div>
          <div style={{ marginTop: 12 }}>
            {accounts.map(a => (
              <span key={a.accountId} style={{ padding: '5px 10px', background: 'oklch(0.3 0.03 240)', borderRadius: 100, fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6, marginRight: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}></span>
                {a.name}
              </span>
            ))}
          </div>
        </div>

        <div className="stat-card">
          <div className="label"><span className="ico"><I.Income style={{ width: 14, height: 14 }} /></span>Receitas</div>
          <div className="val">{brl(totalReceitas)}</div>
          <div className="delta up">{transactions.filter(t => Number(t.amount) > 0).length} lançamentos</div>
        </div>

        <div className="stat-card">
          <div className="label"><span className="ico danger"><I.Expense style={{ width: 14, height: 14 }} /></span>Gastos</div>
          <div className="val">{brl(totalGastos)}</div>
          <div className="delta down">{transactions.filter(t => Number(t.amount) < 0).length} lançamentos</div>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <h3>Atividade recente</h3>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{transactions.length} transações no total</span>
        </div>
        {recent.length === 0
          ? <p style={{ color: 'var(--ink-3)', fontSize: 14, padding: '20px 0' }}>Nenhuma transação registrada.</p>
          : recent.map((t, i) => (
            <div key={i} className="tx-row">
              <div className={`tx-ico ${Number(t.amount) < 0 ? 'out' : ''}`}>
                {Number(t.amount) > 0 ? <I.Income style={{ width: 16, height: 16 }} /> : <I.Expense style={{ width: 16, height: 16 }} />}
              </div>
              <div>
                <div className="tx-title">{t.description}</div>
                <div className="tx-sub">{fmtDate(t.dtTransaction)} · {t.Account?.name || '—'}</div>
              </div>
              <span className="pill">{t.Category?.name || '—'}</span>
              <span className={`tx-amt ${Number(t.amount) < 0 ? 'neg' : ''}`}>
                {Number(t.amount) > 0 ? '+ ' : '− '}{brl(t.amount)}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
