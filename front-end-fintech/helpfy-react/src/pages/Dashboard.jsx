import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { gastosApi, receitasApi } from '../services/mockApi'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function Dashboard() {
  const { user } = useAuth()
  const [data, setData] = useState({ gastos: [], receitas: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([gastosApi.list(), receitasApi.list()])
      .then(([gastos, receitas]) => {
        setData({ gastos, receitas })
        setLoading(false)
      })
  }, [])

  const totalReceitas = data.receitas.reduce((s, r) => s + r.valor, 0)
  const totalGastos   = data.gastos.reduce((s, g) => s + g.valor, 0)
  const saldo = totalReceitas - totalGastos

  const recentTx = [
    ...data.receitas.slice(0, 3).map(r => ({ ...r, type: 'in' })),
    ...data.gastos.slice(0, 3).map(g => ({ ...g, type: 'out' })),
  ].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 6)

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
          <div className="label">Saldo do mês</div>
          <div className="val">{brl(saldo)}</div>
          <div className="delta">Receitas − Gastos</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Income style={{ width: 14, height: 14 }} /></span>Receitas</div>
          <div className="val">{brl(totalReceitas)}</div>
          <div className="delta up">↑ {data.receitas.length} lançamentos</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico danger"><I.Expense style={{ width: 14, height: 14 }} /></span>Gastos</div>
          <div className="val">{brl(totalGastos)}</div>
          <div className="delta down">↑ {data.gastos.length} lançamentos</div>
        </div>
      </div>

      <div className="card">
        <div className="card-h">
          <h3>Atividade recente</h3>
        </div>
        {recentTx.length === 0
          ? <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Nenhuma transação registrada.</p>
          : recentTx.map((t, i) => (
            <div key={i} className="tx-row">
              <div className={`tx-ico ${t.type === 'out' ? 'out' : ''}`}>
                {t.type === 'in' ? <I.Income style={{ width: 16, height: 16 }} /> : <I.Expense style={{ width: 16, height: 16 }} />}
              </div>
              <div className="tx-info">
                <div className="tx-title">{t.descricao}</div>
                <div className="tx-sub">{t.data} · {t.conta}</div>
              </div>
              <span className="pill">{t.categoria}</span>
              <span className={`tx-amt ${t.type === 'out' ? 'neg' : 'pos'}`}>
                {t.type === 'in' ? '+ ' : '− '}{brl(t.valor)}
              </span>
            </div>
          ))}
      </div>
    </div>
  )
}
