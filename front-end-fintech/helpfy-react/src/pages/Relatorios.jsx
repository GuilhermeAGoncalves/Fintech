import { useEffect, useState } from 'react'
import { gastosApi, receitasApi, investApi, dividasApi } from '../services/mockApi'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const pct = (v, t) => t ? Math.round((v / t) * 100) : 0

const COLORS = [
  'oklch(0.62 0.19 155)',
  'oklch(0.58 0.16 250)',
  'oklch(0.55 0.22 25)',
  'oklch(0.7 0.18 80)',
  'oklch(0.62 0.19 310)',
  'oklch(0.65 0.16 190)',
  'oklch(0.6 0.2 40)',
  'oklch(0.58 0.14 270)',
]

function DonutChart({ segments, size = 120, stroke = 22 }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  let offset = 0
  const cx = size / 2, cy = size / 2

  return (
    <svg width={size} height={size} style={{ display: 'block' }}>
      {segments.length === 0
        ? <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
        : segments.map((seg, i) => {
            const len = (seg.pct / 100) * circ
            const dash = `${len} ${circ - len}`
            const el = (
              <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                stroke={COLORS[i % COLORS.length]} strokeWidth={stroke}
                strokeDasharray={dash} strokeDashoffset={-offset}
                style={{ transition: 'stroke-dasharray 0.5s ease' }}
              />
            )
            offset += len
            return el
          })}
    </svg>
  )
}

function BarChart({ data, color = 'var(--accent)' }) {
  const max = Math.max(...data.map(d => d.value), 1)
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120, padding: '0 4px' }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 600 }}>{brl(d.value).replace('R$ ', '')}</div>
          <div style={{ width: '100%', background: 'var(--border)', borderRadius: 4, overflow: 'hidden', height: 80 }}>
            <div style={{ width: '100%', background: color, borderRadius: 4, height: `${(d.value / max) * 100}%`, transition: 'height 0.5s ease', marginTop: `${100 - (d.value / max) * 100}%` }} />
          </div>
          <div style={{ fontSize: 10, color: 'var(--ink-3)', textAlign: 'center', lineHeight: 1.2 }}>{d.label}</div>
        </div>
      ))}
    </div>
  )
}

export default function Relatorios() {
  const [data, setData] = useState({ gastos: [], receitas: [], investimentos: [], dividas: [] })
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState('visao')

  useEffect(() => {
    Promise.all([gastosApi.list(), receitasApi.list(), investApi.list(), dividasApi.list()])
      .then(([gastos, receitas, investimentos, dividas]) => {
        setData({ gastos, receitas, investimentos, dividas })
        setLoading(false)
      })
  }, [])

  if (loading) return <div style={{ padding: 40, color: 'var(--ink-3)' }}>Carregando…</div>

  const totalReceitas   = data.receitas.reduce((s, r) => s + r.valor, 0)
  const totalGastos     = data.gastos.reduce((s, g) => s + g.valor, 0)
  const totalInvest     = data.investimentos.reduce((s, i) => s + i.valor, 0)
  const totalDividas    = data.dividas.reduce((s, d) => s + d.total, 0)
  const saldo           = totalReceitas - totalGastos
  const taxaSaude       = totalReceitas > 0 ? Math.round(((totalReceitas - totalGastos) / totalReceitas) * 100) : 0

  // Gastos por categoria
  const gastosCat = Object.entries(
    data.gastos.reduce((acc, g) => { acc[g.categoria] = (acc[g.categoria] || 0) + g.valor; return acc }, {})
  ).sort((a, b) => b[1] - a[1])

  // Receitas por categoria
  const receitasCat = Object.entries(
    data.receitas.reduce((acc, r) => { acc[r.categoria] = (acc[r.categoria] || 0) + r.valor; return acc }, {})
  ).sort((a, b) => b[1] - a[1])

  // Investimentos por tipo
  const investTipo = Object.entries(
    data.investimentos.reduce((acc, i) => { acc[i.tipo] = (acc[i.tipo] || 0) + i.valor; return acc }, {})
  ).sort((a, b) => b[1] - a[1])

  // Bar chart: últimos lançamentos (por conta)
  const gastosContas = Object.entries(
    data.gastos.reduce((acc, g) => { acc[g.conta] = (acc[g.conta] || 0) + g.valor; return acc }, {})
  ).map(([label, value]) => ({ label, value }))

  const gastosSegs = gastosCat.map(([, v]) => ({ pct: pct(v, totalGastos) }))
  const investSegs = investTipo.map(([, v]) => ({ pct: pct(v, totalInvest) }))

  const TABS = [
    { id: 'visao',    label: 'Visão geral' },
    { id: 'gastos',   label: 'Gastos' },
    { id: 'receitas', label: 'Receitas' },
    { id: 'invest',   label: 'Investimentos' },
  ]

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="page-header">
        <div>
          <h2>Relatórios</h2>
          <p>Análise completa das suas finanças</p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, borderBottom: '1px solid var(--border)', paddingBottom: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{ padding: '10px 18px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', background: 'none', border: 'none', borderBottom: tab === t.id ? '2px solid var(--accent)' : '2px solid transparent', color: tab === t.id ? 'var(--accent)' : 'var(--ink-2)', transition: 'all 0.15s', marginBottom: -1 }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* VISÃO GERAL */}
      {tab === 'visao' && (
        <div className="grid" style={{ gap: 16 }}>
          <div className="grid grid-4">
            {[
              { label: 'Receitas', val: brl(totalReceitas), color: 'var(--accent)', delta: `${data.receitas.length} lançamentos`, dir: 'up' },
              { label: 'Gastos',   val: brl(totalGastos),   color: 'var(--danger)', delta: `${data.gastos.length} lançamentos`,   dir: 'down' },
              { label: 'Saldo',    val: brl(saldo),          color: saldo >= 0 ? 'var(--accent)' : 'var(--danger)', delta: 'receitas − gastos', dir: saldo >= 0 ? 'up' : 'down' },
              { label: 'Saúde financeira', val: taxaSaude + '%', color: taxaSaude >= 30 ? 'var(--accent)' : 'var(--danger)', delta: taxaSaude >= 30 ? 'Ótima' : taxaSaude >= 10 ? 'Atenção' : 'Crítica', dir: 'neutral' },
            ].map(({ label, val, color, delta, dir }) => (
              <div key={label} className="stat-card">
                <div className="label">{label}</div>
                <div className="val" style={{ color }}>{val}</div>
                <div className={`delta ${dir}`}>{delta}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-3">
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-h"><h3>Gastos por categoria</h3></div>
              {gastosCat.length === 0
                ? <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Nenhum dado.</p>
                : gastosCat.map(([cat, val], i) => (
                  <div key={cat} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{cat}</span>
                      <span style={{ color: COLORS[i % COLORS.length], fontWeight: 700 }}>{brl(val)} · {pct(val, totalGastos)}%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: pct(val, totalGastos) + '%', background: COLORS[i % COLORS.length] }} />
                    </div>
                  </div>
                ))}
            </div>

            <div className="card">
              <div className="card-h"><h3>Distribuição</h3></div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <DonutChart segments={gastosCat.map(([, v]) => ({ pct: pct(v, totalGastos) }))} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {gastosCat.slice(0, 5).map(([cat], i) => (
                  <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                    <span style={{ color: 'var(--ink-2)' }}>{cat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <div className="card-h"><h3>Gastos por conta</h3></div>
              {gastosContas.length > 0
                ? <BarChart data={gastosContas} color="var(--danger)" />
                : <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>Nenhum dado.</p>}
            </div>
            <div className="card">
              <div className="card-h"><h3>Resumo patrimonial</h3></div>
              {[
                ['Receitas totais', brl(totalReceitas), 'var(--accent)'],
                ['Gastos totais',   brl(totalGastos),   'var(--danger)'],
                ['Patrimônio investido', brl(totalInvest), 'var(--info)'],
                ['Total em dívidas', brl(totalDividas), 'var(--danger)'],
                ['Saldo líquido',   brl(saldo),         saldo >= 0 ? 'var(--accent)' : 'var(--danger)'],
              ].map(([l, v, c]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 14 }}>
                  <span style={{ color: 'var(--ink-2)' }}>{l}</span>
                  <span style={{ fontWeight: 700, color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GASTOS */}
      {tab === 'gastos' && (
        <div className="grid" style={{ gap: 16 }}>
          <div className="grid grid-4">
            <div className="stat-card"><div className="label">Total</div><div className="val" style={{ color: 'var(--danger)' }}>{brl(totalGastos)}</div></div>
            <div className="stat-card"><div className="label">Lançamentos</div><div className="val">{data.gastos.length}</div></div>
            <div className="stat-card"><div className="label">Média por lançamento</div><div className="val">{brl(data.gastos.length ? totalGastos / data.gastos.length : 0)}</div></div>
            <div className="stat-card"><div className="label">Maior gasto</div><div className="val" style={{ fontSize: 15 }}>{data.gastos.length ? data.gastos.reduce((a, b) => b.valor > a.valor ? b : a).descricao : '—'}</div></div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Detalhamento por categoria</h3></div>
            <div className="grid grid-2" style={{ gap: 12 }}>
              <div>
                {gastosCat.map(([cat, val], i) => (
                  <div key={cat} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{cat}</span>
                      <span style={{ fontWeight: 700, color: COLORS[i % COLORS.length] }}>{brl(val)} ({pct(val, totalGastos)}%)</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: pct(val, totalGastos) + '%', background: COLORS[i % COLORS.length] }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <DonutChart segments={gastosCat.map(([, v]) => ({ pct: pct(v, totalGastos) }))} size={140} stroke={26} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, width: '100%' }}>
                  {gastosCat.map(([cat], i) => (
                    <div key={cat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                      <span>{cat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Todos os lançamentos</h3></div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Data</th><th>Valor</th></tr></thead>
                <tbody>
                  {data.gastos.map(g => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600 }}>{g.descricao}</td>
                      <td><span className="pill red">{g.categoria}</span></td>
                      <td>{g.conta}</td>
                      <td style={{ color: 'var(--ink-3)' }}>{g.data}</td>
                      <td style={{ fontWeight: 700, color: 'var(--danger)' }}>− {brl(g.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RECEITAS */}
      {tab === 'receitas' && (
        <div className="grid" style={{ gap: 16 }}>
          <div className="grid grid-4">
            <div className="stat-card"><div className="label">Total</div><div className="val" style={{ color: 'var(--accent)' }}>{brl(totalReceitas)}</div></div>
            <div className="stat-card"><div className="label">Lançamentos</div><div className="val">{data.receitas.length}</div></div>
            <div className="stat-card"><div className="label">Média</div><div className="val">{brl(data.receitas.length ? totalReceitas / data.receitas.length : 0)}</div></div>
            <div className="stat-card"><div className="label">Maior entrada</div><div className="val" style={{ fontSize: 15 }}>{data.receitas.length ? data.receitas.reduce((a, b) => b.valor > a.valor ? b : a).descricao : '—'}</div></div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Detalhamento por categoria</h3></div>
            {receitasCat.map(([cat, val], i) => (
              <div key={cat} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                  <span style={{ fontWeight: 600 }}>{cat}</span>
                  <span style={{ fontWeight: 700, color: COLORS[i % COLORS.length] }}>{brl(val)} ({pct(val, totalReceitas)}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: pct(val, totalReceitas) + '%', background: COLORS[i % COLORS.length] }} />
                </div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Todos os lançamentos</h3></div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Data</th><th>Valor</th></tr></thead>
                <tbody>
                  {data.receitas.map(r => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 600 }}>{r.descricao}</td>
                      <td><span className="pill green">{r.categoria}</span></td>
                      <td>{r.conta}</td>
                      <td style={{ color: 'var(--ink-3)' }}>{r.data}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent)' }}>+ {brl(r.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* INVESTIMENTOS */}
      {tab === 'invest' && (
        <div className="grid" style={{ gap: 16 }}>
          <div className="grid grid-3">
            <div className="stat-card"><div className="label">Patrimônio investido</div><div className="val" style={{ color: 'var(--info)' }}>{brl(totalInvest)}</div></div>
            <div className="stat-card"><div className="label">Ativos</div><div className="val">{data.investimentos.length}</div></div>
            <div className="stat-card">
              <div className="label">Rent. média</div>
              <div className="val">{data.investimentos.length ? (data.investimentos.reduce((s, i) => s + (i.rentabilidade || 0), 0) / data.investimentos.length).toFixed(1) : 0}%</div>
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Distribuição por tipo</h3></div>
            <div className="grid grid-2" style={{ gap: 16 }}>
              <div>
                {investTipo.map(([tipo, val], i) => (
                  <div key={tipo} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: 13 }}>
                      <span style={{ fontWeight: 600 }}>{tipo}</span>
                      <span style={{ fontWeight: 700, color: COLORS[i % COLORS.length] }}>{brl(val)} ({pct(val, totalInvest)}%)</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: pct(val, totalInvest) + '%', background: COLORS[i % COLORS.length] }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                <DonutChart segments={investSegs} size={140} stroke={26} />
                {investTipo.map(([tipo], i) => (
                  <div key={tipo} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, alignSelf: 'flex-start' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS[i % COLORS.length], flexShrink: 0 }} />
                    <span>{tipo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '14px 22px', borderBottom: '1px solid var(--border)' }}><h3 style={{ fontSize: 15, fontWeight: 700 }}>Carteira detalhada</h3></div>
            <div className="table-wrap">
              <table className="table">
                <thead><tr><th>Nome</th><th>Tipo</th><th>Valor</th><th>Rentabilidade</th><th>Lucro</th></tr></thead>
                <tbody>
                  {data.investimentos.map(inv => (
                    <tr key={inv.id}>
                      <td style={{ fontWeight: 600 }}>{inv.nome}</td>
                      <td><span className="pill blue">{inv.tipo}</span></td>
                      <td style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{brl(inv.valor)}</td>
                      <td style={{ color: inv.rentabilidade >= 0 ? 'var(--accent)' : 'var(--danger)', fontWeight: 700 }}>{inv.rentabilidade >= 0 ? '+' : ''}{inv.rentabilidade}%</td>
                      <td style={{ color: inv.lucro >= 0 ? 'var(--accent)' : 'var(--danger)', fontWeight: 700 }}>{inv.lucro >= 0 ? '+' : ''}{brl(inv.lucro)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
