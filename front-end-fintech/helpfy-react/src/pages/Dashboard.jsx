import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { gastosApi, receitasApi, objetivosApi, investApi } from '../services/mockApi'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [data, setData] = useState({ gastos: [], receitas: [], objetivos: [], investimentos: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([gastosApi.list(), receitasApi.list(), objetivosApi.list(), investApi.list()])
      .then(([gastos, receitas, objetivos, investimentos]) => {
        setData({ gastos, receitas, objetivos, investimentos })
        setLoading(false)
      })
  }, [])

  const totalReceitas = data.receitas.reduce((s, r) => s + r.valor, 0)
  const totalGastos   = data.gastos.reduce((s, g) => s + g.valor, 0)
  const totalInvest   = data.investimentos.reduce((s, i) => s + i.valor, 0)
  const saldo = totalReceitas - totalGastos

  const recentTx = [
    ...data.receitas.slice(0, 3).map(r => ({ ...r, type: 'in' })),
    ...data.gastos.slice(0, 3).map(g => ({ ...g, type: 'out' })),
  ].sort((a, b) => new Date(b.data) - new Date(a.data)).slice(0, 6)

  if (loading) return <div style={{ padding: 40, color: 'var(--ink-3)' }}>Carregando…</div>

  const firstName = user?.name?.split(' ')[0] || 'Usuário'

  return (
    <div className="grid" style={{ gap: 20 }}>
      {/* Saudação */}
      <div>
        <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
          Olá, {firstName} 👋
        </h2>
        <p style={{ color: 'var(--ink-3)', marginTop: 4 }}>Aqui está um resumo das suas finanças.</p>
      </div>

      {/* Cards de saldo */}
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
        <div className="stat-card">
          <div className="label"><span className="ico info"><I.Invest style={{ width: 14, height: 14 }} /></span>Investido</div>
          <div className="val">{brl(totalInvest)}</div>
          <div className="delta neutral">{data.investimentos.length} ativos</div>
        </div>
      </div>

      {/* Ações rápidas */}
      <div className="card">
        <div className="card-h"><h3>Ações rápidas</h3></div>
        <div className="grid grid-4" style={{ gap: 10 }}>
          {[
            { label: 'Nova receita',   path: '/receitas',     Icon: I.Income,  bg: 'var(--accent-soft)',  color: 'var(--accent)' },
            { label: 'Novo gasto',     path: '/gastos',       Icon: I.Expense, bg: 'var(--danger-soft)',  color: 'var(--danger)' },
            { label: 'Novo aporte',    path: '/investimentos',Icon: I.Invest,  bg: 'var(--info-soft)',    color: 'var(--info)' },
            { label: 'Novo objetivo',  path: '/objetivos',    Icon: I.Goal,    bg: 'var(--accent-soft)',  color: 'var(--accent)' },
          ].map(({ label, path, Icon, bg, color }) => (
            <button key={label} onClick={() => navigate(path)}
              style={{ padding: '16px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 14, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, fontWeight: 600, fontSize: 12.5, cursor: 'pointer', transition: 'all 0.15s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = color }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'var(--border)' }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: bg, color, display: 'grid', placeItems: 'center' }}>
                <Icon style={{ width: 18, height: 18 }} />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-3">
        {/* Atividade recente */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div className="card-h">
            <h3>Atividade recente</h3>
            <button onClick={() => navigate('/receitas')} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Ver tudo →</button>
          </div>
          {recentTx.length === 0
            ? <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Nenhuma transação.</p>
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

        {/* Objetivos mini */}
        <div className="card">
          <div className="card-h">
            <h3>Objetivos</h3>
            <button onClick={() => navigate('/objetivos')} style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 13, cursor: 'pointer' }}>Ver todos</button>
          </div>
          {data.objetivos.slice(0, 3).map(g => {
            const pct = Math.round((g.atual / g.meta) * 100)
            return (
              <div key={g.id} className="goal-mini">
                <div className="goal-mini-head">
                  <span>{g.nome}</span>
                  <span className="goal-mini-pct">{pct}%</span>
                </div>
                <div className="progress-bar"><div className="progress-fill" style={{ width: pct + '%' }} /></div>
                <div className="goal-mini-meta">
                  <span>{brl(g.atual)} guardados</span>
                  <span>de {brl(g.meta)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
