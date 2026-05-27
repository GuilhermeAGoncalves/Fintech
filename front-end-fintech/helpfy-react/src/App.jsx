import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './context/AuthContext'
import { api } from './api'
import * as I from './components/Icons'

// ============ UTILS ============
const brl = (n) => 'R$ ' + Math.abs(Number(n)||0).toLocaleString('pt-BR', { minimumFractionDigits:2, maximumFractionDigits:2 })
const fmtDate = (iso) => { if(!iso) return '—'; const d=new Date(iso); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` }
const isoNow = () => new Date().toISOString().slice(0,16)
const todayLabel = () => { const d=new Date(); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` }

// ============ LOGIN ============
function Login() {
  const { login, register } = useAuth()
  const [tab, setTab] = useState('entrar')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [name, setName] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setLoading(true)
    try {
      if (tab === 'criar') {
        await register(name, email, pw)
      } else {
        await login(email, pw)
      }
    } catch(err) {
      setError(err.message || 'Erro ao conectar. Verifique se o back-end está rodando.')
    } finally { setLoading(false) }
  }

  return (
    <div className="login-page">
      <aside className="login-side">
        <div className="login-side-logo"><span className="mark">H</span><span>HelpFy<span style={{color:'var(--accent)'}}>.</span></span></div>
        <div className="login-quote">
          <div className="login-eyebrow">Help Financially</div>
          <h1>Seu dinheiro,<br/><em>sob controle</em>.<br/>Sem esforço.</h1>
          <p>Acesse sua conta e continue de onde parou. Receitas, gastos e contas — tudo em um lugar.</p>
          <div className="login-feats">
            <div className="login-feat"><span className="check"><I.Heart style={{width:14,height:14}}/></span><span>Dados criptografados ponta-a-ponta</span></div>
            <div className="login-feat"><span className="check"><I.Pix style={{width:14,height:14}}/></span><span>Integração com Pix e principais bancos</span></div>
            <div className="login-feat"><span className="check"><I.Chart style={{width:14,height:14}}/></span><span>Relatórios em tempo real, sem planilha</span></div>
          </div>
        </div>
        <div className="login-foot"><span>© 2026 HelpFy</span><span>Help Financially</span></div>
      </aside>
      <section className="login-form-col">
        <div className="login-form-inner fade-in">
          <h2>{tab==='entrar'?'Bem-vindo de volta':'Crie sua conta'}</h2>
          <p className="sub">{tab==='entrar'?'Entre para gerenciar sua vida financeira.':'Comece grátis, sem cartão de crédito.'}</p>
          <div className="login-tabs">
            <button className={`login-tab${tab==='entrar'?' active':''}`} onClick={()=>{setTab('entrar');setError('')}}>Entrar</button>
            <button className={`login-tab${tab==='criar'?' active':''}`} onClick={()=>{setTab('criar');setError('')}}>Criar conta</button>
          </div>
          {error && <div className="login-error">{error}</div>}
          <form onSubmit={submit}>
            {tab==='criar' && (
              <div className="field"><label className="field-label">Nome completo</label>
                <input className="field-input" type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Seu nome" required/>
              </div>
            )}
            <div className="field"><label className="field-label">E-mail</label>
              <input className="field-input" type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="voce@email.com" required/>
            </div>
            <div className="field"><label className="field-label">Senha</label>
              <div style={{position:'relative'}}>
                <input className="field-input" type={showPw?'text':'password'} value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" style={{paddingRight:44}} required/>
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{position:'absolute',right:12,top:'50%',transform:'translateY(-50%)',color:'var(--ink-3)'}}>
                  {showPw?<I.EyeOff style={{width:16,height:16}}/>:<I.Eye style={{width:16,height:16}}/>}
                </button>
              </div>
            </div>
            <button type="submit" className="login-submit" disabled={loading}>
              {loading?'Carregando…':<>{tab==='entrar'?'Acessar conta':'Criar conta grátis'}<I.Arrow style={{width:16,height:16}}/></>}
            </button>
          </form>
          <div className="login-cta-foot">
            {tab==='entrar'?<><span>Novo por aqui? </span><a onClick={()=>{setTab('criar');setError('')}}>Crie uma conta grátis</a></>:<><span>Já tem conta? </span><a onClick={()=>{setTab('entrar');setError('')}}>Entrar</a></>}
          </div>
        </div>
      </section>
    </div>
  )
}

// ============ MODAL NOVA CONTA ============
function ContaModal({ onClose, onSubmit }) {
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [type, setType] = useState('CORRENTE')
  const [color, setColor] = useState('green')
  const [loading, setLoading] = useState(false)

  const TYPES = [
    { id:'CORRENTE',     label:'Corrente',     emoji:'🏦' },
    { id:'POUPANCA',     label:'Poupança',     emoji:'🐷' },
    { id:'INVESTIMENTO', label:'Investimento', emoji:'📈' },
    { id:'CARTEIRA',     label:'Carteira',     emoji:'👛' },
  ]
  const COLORS = [
    { id:'green',  hex:'#22c55e' },
    { id:'blue',   hex:'#3b82f6' },
    { id:'purple', hex:'#a855f7' },
    { id:'orange', hex:'#f97316' },
    { id:'red',    hex:'#ef4444' },
    { id:'gray',   hex:'#6b7280' },
  ]

  const fmt = v => {
    const n = v.replace(/[^\d]/g,'')
    if(!n) return ''
    return (Number(n)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})
  }
  const parse = v => parseFloat((v||'').replace(/\./g,'').replace(',','.')) || 0

  const submit = async () => {
    if(!name.trim()) return
    setLoading(true)
    try { await onSubmit({ name, initialBalance: parse(balance), accountType: type, color, isActive: true }) }
    finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-ico"><I.Wallet style={{width:20,height:20}}/></div>
          <div><div className="modal-title">Nova conta</div><div className="modal-sub">Adicione uma conta bancária ou carteira</div></div>
          <button className="modal-close" onClick={onClose}><I.X style={{width:18,height:18}}/></button>
        </div>
        <div className="modal-body">

          {/* Nome */}
          <div className="field">
            <label className="field-label">Nome da conta</label>
            <input className="field-input" value={name} onChange={e=>setName(e.target.value)} placeholder="Ex: Nubank, Itaú, Carteira..." autoFocus/>
          </div>

          {/* Saldo */}
          <div style={{background:'var(--surface)',border:'1px solid var(--border)',borderRadius:16,padding:'20px 22px',textAlign:'center'}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.12em',fontWeight:700,color:'var(--ink-3)',marginBottom:10}}>Saldo inicial</div>
            <div style={{display:'inline-flex',alignItems:'baseline',gap:6,fontSize:40,fontWeight:700,color:'var(--ink)',letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums'}}>
              <span style={{fontSize:20,opacity:0.5,fontWeight:600}}>R$</span>
              <input
                style={{background:'transparent',border:'none',outline:'none',color:'inherit',font:'inherit',textAlign:'center',width:'10ch'}}
                type="text" inputMode="numeric" placeholder="0,00"
                value={balance}
                onChange={e=>setBalance(fmt(e.target.value))}
              />
            </div>
            <div style={{fontSize:12,color:'var(--ink-4)',marginTop:6}}>Deixe 0 se não souber o saldo agora</div>
          </div>

          {/* Tipo */}
          <div className="field">
            <label className="field-label">Tipo de conta</label>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
              {TYPES.map(t=>(
                <button key={t.id} type="button" onClick={()=>setType(t.id)}
                  style={{padding:'12px 14px',borderRadius:12,border:`1.5px solid ${type===t.id?'var(--ink)':'var(--border)'}`,background:type===t.id?'var(--ink)':'var(--surface)',color:type===t.id?'var(--bg)':'var(--ink)',fontWeight:600,fontSize:13.5,display:'flex',alignItems:'center',gap:10,transition:'all 0.15s',cursor:'pointer'}}>
                  <span style={{fontSize:18}}>{t.emoji}</span>{t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cor */}
          <div className="field">
            <label className="field-label">Cor da conta</label>
            <div style={{display:'flex',gap:10,padding:'12px 14px',background:'var(--surface)',borderRadius:12,border:'1px solid var(--border)'}}>
              {COLORS.map(c=>(
                <button key={c.id} type="button" onClick={()=>setColor(c.id)}
                  style={{width:32,height:32,borderRadius:'50%',background:c.hex,border:`3px solid ${color===c.id?'var(--ink)':'transparent'}`,outline:`2px solid ${color===c.id?c.hex:'transparent'}`,outlineOffset:2,cursor:'pointer',transition:'all 0.15s',transform:color===c.id?'scale(1.15)':'scale(1)'}}
                />
              ))}
            </div>
          </div>

        </div>
        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-submit dark" onClick={submit} disabled={loading||!name.trim()}>
            {loading?'Criando…':'Criar conta'} <I.Arrow style={{width:14,height:14}}/>
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ MODAL TRANSAÇÃO ============
function TransacaoModal({ kind, onClose, onSubmit, accounts, categories }) {
  const isReceita = kind === 'receita'
  const accent = isReceita ? 'var(--accent)' : 'var(--danger)'
  const accentSoft = isReceita ? 'var(--accent-soft)' : 'var(--danger-soft)'
  const [amount, setAmount] = useState('')
  const [desc, setDesc] = useState('')
  const [accountId, setAccountId] = useState(accounts[0]?.accountId || '')
  const [categoryId, setCategoryId] = useState('')
  const [dt, setDt] = useState(isoNow())
  const [loading, setLoading] = useState(false)

  const filteredCats = categories.filter(c => isReceita ? c.type==='REVENUE' : c.type==='EXPENSE')

  useEffect(() => {
    if (filteredCats.length > 0) setCategoryId(filteredCats[0].categoryid)
  }, [kind])

  const fmt = v => {
    const n = v.replace(/[^\d]/g,'')
    if(!n) return ''
    return (Number(n)/100).toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})
  }
  const parse = v => parseFloat((v||'').replace(/\./g,'').replace(',','.')) || 0

  const submit = async () => {
    if(!amount || !accountId || !categoryId) return
    setLoading(true)
    try {
      await onSubmit({
        accountId, categoryId,
        description: desc || (isReceita?'Receita':'Gasto'),
        amount: isReceita ? Math.abs(parse(amount)) : -Math.abs(parse(amount)),
        dtTransaction: new Date(dt).toISOString().slice(0,19),
        status: 'COMPLETED',
      })
    } finally { setLoading(false) }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>

        {/* Header colorido */}
        <div style={{background:isReceita?'oklch(0.17 0.025 240)':'oklch(0.25 0.06 20)',borderRadius:'24px 24px 0 0',padding:'24px',display:'flex',alignItems:'center',gap:14,position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:-30,right:-30,width:140,height:140,borderRadius:'50%',background:`radial-gradient(circle, color-mix(in oklch, ${accent} 40%, transparent), transparent 70%)`}}/>
          <div style={{width:44,height:44,borderRadius:14,background:accentSoft,color:accent,display:'grid',placeItems:'center',flexShrink:0,position:'relative'}}>
            {isReceita?<I.Income style={{width:22,height:22}}/>:<I.Expense style={{width:22,height:22}}/>}
          </div>
          <div style={{position:'relative'}}>
            <div style={{fontSize:18,fontWeight:700,color:'oklch(0.96 0.008 95)'}}>{isReceita?'Nova receita':'Novo gasto'}</div>
            <div style={{fontSize:12.5,color:'oklch(0.75 0.02 95)',marginTop:2}}>{isReceita?'Entrada de dinheiro':'Saída de despesa'} · {todayLabel()}</div>
          </div>
          <button onClick={onClose} style={{marginLeft:'auto',width:32,height:32,borderRadius:8,color:'oklch(0.75 0.02 95)',display:'grid',placeItems:'center',position:'relative'}}><I.X style={{width:16,height:16}}/></button>
        </div>

        <div className="modal-body">

          {/* Valor grande */}
          <div style={{background:accentSoft,border:`1.5px solid color-mix(in oklch, ${accent} 25%, transparent)`,borderRadius:16,padding:'22px',textAlign:'center'}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.12em',fontWeight:700,color:accent,marginBottom:10,opacity:0.8}}>Valor</div>
            <div style={{display:'inline-flex',alignItems:'baseline',gap:6,fontSize:44,fontWeight:700,color:accent,letterSpacing:'-0.025em',fontVariantNumeric:'tabular-nums',lineHeight:1}}>
              <span style={{fontSize:22,opacity:0.6,fontWeight:600}}>R$</span>
              <input
                style={{background:'transparent',border:'none',outline:'none',color:'inherit',font:'inherit',textAlign:'center',width:'9ch'}}
                type="text" inputMode="numeric" placeholder="0,00"
                value={amount} onChange={e=>setAmount(fmt(e.target.value))} autoFocus
              />
            </div>
            <div style={{fontSize:12,color:accent,opacity:0.7,marginTop:8}}>{isReceita?'Valor que entrou na conta':'Valor que saiu da conta'}</div>
          </div>

          {/* Conta */}
          {accounts.length > 0 ? (
            <div className="field">
              <label className="field-label">Conta</label>
              <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(130px, 1fr))',gap:8}}>
                {accounts.map(a=>(
                  <button key={a.accountId} type="button" onClick={()=>setAccountId(a.accountId)}
                    style={{padding:'10px 14px',borderRadius:12,border:`1.5px solid ${accountId===a.accountId?'var(--ink)':'var(--border)'}`,background:accountId===a.accountId?'var(--ink)':'var(--surface)',color:accountId===a.accountId?'var(--bg)':'var(--ink)',fontWeight:600,fontSize:13,display:'flex',alignItems:'center',gap:8,transition:'all 0.15s',cursor:'pointer'}}>
                    <span style={{fontSize:16}}>💳</span>{a.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{padding:12,background:'var(--warn-soft)',borderRadius:10,fontSize:13,color:'var(--warn)',fontWeight:500}}>⚠️ Crie uma conta bancária primeiro antes de lançar transações.</div>
          )}

          {/* Categoria */}
          {filteredCats.length > 0 ? (
            <div className="field">
              <label className="field-label">Categoria</label>
              <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                {filteredCats.map(c=>(
                  <button key={c.categoryid} type="button" onClick={()=>setCategoryId(c.categoryid)}
                    style={{padding:'8px 14px',borderRadius:100,fontSize:13,fontWeight:600,border:`1.5px solid ${categoryId===c.categoryid?accent:'var(--border)'}`,background:categoryId===c.categoryid?accentSoft:'var(--surface)',color:categoryId===c.categoryid?accent:'var(--ink-2)',transition:'all 0.15s',cursor:'pointer'}}>
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div style={{padding:12,background:'var(--warn-soft)',borderRadius:10,fontSize:13,color:'var(--warn)',fontWeight:500}}>⚠️ Nenhuma categoria {isReceita?'de receita':'de gasto'} encontrada.</div>
          )}

          {/* Descrição */}
          <div className="field">
            <label className="field-label">Descrição (opcional)</label>
            <input className="field-input" value={desc} onChange={e=>setDesc(e.target.value)} placeholder={isReceita?'Ex: Salário, freelance...':'Ex: Supermercado, gasolina...'}/>
          </div>

          {/* Data */}
          <div className="field">
            <label className="field-label">Data e hora</label>
            <input className="field-input" type="datetime-local" value={dt} onChange={e=>setDt(e.target.value)}/>
          </div>

        </div>
        <div className="modal-foot">
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button
            style={{flex:1,padding:12,borderRadius:12,background:accent,color:'white',fontWeight:700,fontSize:14.5,display:'inline-flex',alignItems:'center',justifyContent:'center',gap:8,border:'none',cursor:loading||!amount||!accountId||!categoryId?'not-allowed':'pointer',opacity:loading||!amount||!accountId||!categoryId?0.5:1,transition:'all 0.15s'}}
            onClick={submit} disabled={loading||!amount||!accountId||!categoryId||filteredCats.length===0}>
            {loading?'Salvando…':(isReceita?'Adicionar receita':'Adicionar gasto')} <I.Arrow style={{width:14,height:14}}/>
          </button>
        </div>
      </div>
    </div>
  )
}

// ============ DASHBOARD ============
function Dashboard({ accounts, transactions, onAdd }) {
  const revenues = transactions.filter(t=>Number(t.amount)>0)
  const expenses = transactions.filter(t=>Number(t.amount)<0)
  const totalBalance = accounts.reduce((s,a)=>s+Number(a.initialBalance||0),0)
  const totalRevenue = revenues.reduce((s,t)=>s+Number(t.amount),0)
  const totalExpense = expenses.reduce((s,t)=>s+Math.abs(Number(t.amount)),0)
  const recent = [...transactions].sort((a,b)=>new Date(b.dtTransaction)-new Date(a.dtTransaction)).slice(0,6)

  return (
    <div className="grid" style={{gap:20}}>
      <div className="grid grid-bal">
        <div className="balance-hero">
          <div className="label">Saldo consolidado</div>
          <div className="balance-val">{brl(totalBalance)}</div>
          <div className="balance-delta">{accounts.length} conta{accounts.length!==1?'s':''} ativa{accounts.length!==1?'s':''}</div>
          <div style={{marginTop:12}}>
            {accounts.map(a=><span key={a.accountId} className="acc-chip"><span className="d" style={{background:'var(--accent)'}}></span>{a.name}</span>)}
          </div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Income style={{width:14,height:14}}/></span>Receitas</div>
          <div className="val">{brl(totalRevenue)}</div>
          <div className="delta up">{revenues.length} lançamento{revenues.length!==1?'s':''}</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico danger"><I.Expense style={{width:14,height:14}}/></span>Gastos</div>
          <div className="val">{brl(totalExpense)}</div>
          <div className="delta down">{expenses.length} lançamento{expenses.length!==1?'s':''}</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico info"><I.Chart style={{width:14,height:14}}/></span>Saldo líquido</div>
          <div className="val">{brl(totalRevenue-totalExpense)}</div>
          <div className={`delta ${totalRevenue>=totalExpense?'up':'down'}`}>{totalRevenue>=totalExpense?'Positivo':'Negativo'}</div>
        </div>
      </div>

      <div className="card">
        <div className="card-h"><h3>Ações rápidas</h3><span className="card-h-sub">Adicione em 1 toque</span></div>
        <div className="quick-actions">
          <button className="quick-action" onClick={()=>onAdd('conta')}><span className="qa-ico"><I.Wallet style={{width:18,height:18}}/></span><span>Nova conta</span></button>
          <button className="quick-action" onClick={()=>onAdd('receita')}><span className="qa-ico"><I.Income style={{width:18,height:18}}/></span><span>Nova receita</span></button>
          <button className="quick-action" onClick={()=>onAdd('gasto')}><span className="qa-ico"><I.Expense style={{width:18,height:18}}/></span><span>Novo gasto</span></button>
        </div>
      </div>

      <div className="card">
        <div className="card-h"><h3>Atividade recente</h3><span className="card-h-sub">{transactions.length} transações no total</span></div>
        {recent.length===0 ? (
          <div className="empty"><div className="emo"><I.Income style={{width:24,height:24}}/></div><h3>Sem transações ainda</h3><p>Adicione sua primeira receita ou gasto para começar.</p></div>
        ) : recent.map((t,i)=>(
          <div className="tx-row" key={i}>
            <div className={`tx-ico${Number(t.amount)<0?' out':''}`}>{Number(t.amount)>0?<I.Income style={{width:16,height:16}}/>:<I.Expense style={{width:16,height:16}}/>}</div>
            <div><div className="tx-title">{t.description}</div><div className="tx-sub">{fmtDate(t.dtTransaction)} · {t.Account?.name||'—'}</div></div>
            <span className="tx-cat">{t.Category?.name||'—'}</span>
            <span className={`tx-amt${Number(t.amount)<0?' neg':''}`}>{Number(t.amount)>0?'+ ':'− '}{brl(t.amount)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============ CONTAS ============
function Contas({ accounts, onAdd, onDelete, onRefresh }) {
  return (
    <div className="grid" style={{gap:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{fontSize:15,fontWeight:600,color:'var(--ink-2)'}}>{accounts.length} conta{accounts.length!==1?'s':''} cadastrada{accounts.length!==1?'s':''}</div>
        <div style={{display:'flex',gap:8}}>
          <button className="icon-btn" onClick={onRefresh}><I.Refresh style={{width:18,height:18}}/></button>
          <button className="btn-cta" onClick={()=>onAdd('conta')}><I.Plus style={{width:14,height:14}}/> Nova conta</button>
        </div>
      </div>
      {accounts.length===0 ? (
        <div className="card"><div className="empty"><div className="emo"><I.Wallet style={{width:24,height:24}}/></div><h3>Nenhuma conta ainda</h3><p>Adicione sua primeira conta bancária ou carteira.</p><button className="btn-cta" onClick={()=>onAdd('conta')}><I.Plus style={{width:14,height:14}}/> Nova conta</button></div></div>
      ) : (
        <div className="grid grid-2">
          {accounts.map(a=>(
            <div className="card" key={a.accountId} style={{position:'relative'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:12}}>
                <div><div style={{fontWeight:700,fontSize:16}}>{a.name}</div><div style={{fontSize:12,color:'var(--ink-3)',marginTop:2}}>{a.accountType}</div></div>
                <button className="icon-btn" onClick={()=>onDelete(a.accountId)} style={{color:'var(--danger)'}}><I.Trash style={{width:16,height:16}}/></button>
              </div>
              <div style={{fontSize:28,fontWeight:700,letterSpacing:'-0.02em',fontVariantNumeric:'tabular-nums'}}>{brl(a.initialBalance)}</div>
              <div style={{marginTop:8,fontSize:12,color:'var(--ink-3)'}}>Saldo atual · {a.isActive?'Ativa':'Inativa'}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============ TRANSAÇÕES ============
function Transacoes({ transactions, onAdd, onRefresh }) {
  const [filter, setFilter] = useState('todas')
  const filtered = transactions.filter(t=>filter==='todas'?true:filter==='receitas'?Number(t.amount)>0:Number(t.amount)<0)
  const sorted = [...filtered].sort((a,b)=>new Date(b.dtTransaction)-new Date(a.dtTransaction))

  return (
    <div className="grid" style={{gap:20}}>
      <div className="grid grid-4">
        <div className="stat-card"><div className="label">Total</div><div className="val">{transactions.length}</div><div className="delta neutral">transações</div></div>
        <div className="stat-card"><div className="label"><span className="ico"><I.Income style={{width:14,height:14}}/></span>Receitas</div><div className="val">{brl(transactions.filter(t=>Number(t.amount)>0).reduce((s,t)=>s+Number(t.amount),0))}</div><div className="delta up">{transactions.filter(t=>Number(t.amount)>0).length} lançamentos</div></div>
        <div className="stat-card"><div className="label"><span className="ico danger"><I.Expense style={{width:14,height:14}}/></span>Gastos</div><div className="val">{brl(transactions.filter(t=>Number(t.amount)<0).reduce((s,t)=>s+Math.abs(Number(t.amount)),0))}</div><div className="delta down">{transactions.filter(t=>Number(t.amount)<0).length} lançamentos</div></div>
        <div className="stat-card"><div className="label">Saldo líquido</div><div className="val">{brl(transactions.reduce((s,t)=>s+Number(t.amount),0))}</div><div className="delta neutral">receitas - gastos</div></div>
      </div>
      <div className="card list-card">
        <div className="list-card-head">
          <div className="filters">
            {['todas','receitas','gastos'].map(f=><button key={f} className={`filter-chip${filter===f?' active':''}`} onClick={()=>setFilter(f)}>{f.charAt(0).toUpperCase()+f.slice(1)}</button>)}
          </div>
          <div style={{display:'flex',gap:8}}>
            <button className="icon-btn" onClick={onRefresh}><I.Refresh style={{width:18,height:18}}/></button>
            <button className="btn-cta" onClick={()=>onAdd('receita')}><I.Plus style={{width:14,height:14}}/> Nova receita</button>
            <button className="btn-cta danger" onClick={()=>onAdd('gasto')}><I.Plus style={{width:14,height:14}}/> Novo gasto</button>
          </div>
        </div>
        {sorted.length===0 ? (
          <div className="empty"><div className="emo"><I.Income style={{width:24,height:24}}/></div><h3>Nenhuma transação</h3><p>Adicione sua primeira receita ou gasto.</p></div>
        ) : (
          <div className="table">
            <div className="table-row head"><span></span><span>Descrição</span><span>Categoria</span><span>Conta</span><span>Data</span><span style={{textAlign:'right'}}>Valor</span></div>
            {sorted.map((t,i)=>(
              <div className="table-row" key={i}>
                <div className={`tx-ico${Number(t.amount)<0?' out':''}`} style={{width:32,height:32}}>{Number(t.amount)>0?<I.Income style={{width:14,height:14}}/>:<I.Expense style={{width:14,height:14}}/>}</div>
                <div><div style={{fontWeight:600}}>{t.description}</div></div>
                <span><span className="pill">{t.Category?.name||'—'}</span></span>
                <span><span className="pill">{t.Account?.name||'—'}</span></span>
                <span style={{color:'var(--ink-3)',fontSize:12}}>{fmtDate(t.dtTransaction)}</span>
                <span className={`tx-amt${Number(t.amount)<0?' neg':''}`} style={{textAlign:'right'}}>{Number(t.amount)>0?'+ ':'− '}{brl(t.amount)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ============ APP SHELL ============
const NAV = [
  { id:'dashboard',  label:'Dashboard',  ico:<I.Home style={{width:18,height:18}}/> },
  { id:'contas',     label:'Contas',     ico:<I.Wallet style={{width:18,height:18}}/> },
  { id:'transacoes', label:'Transações', ico:<I.Income style={{width:18,height:18}}/> },
]

function AppShell() {
  const { user, logout } = useAuth()
  const [active, setActive] = useState('dashboard')
  const [modal, setModal] = useState(null)
  const [toast, setToast] = useState(null)
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  const showToast = (msg, isError=false) => {
    setToast({msg,isError})
    setTimeout(()=>setToast(null), 2800)
  }

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [accs, txs, cats] = await Promise.all([
        api.getAccounts(user.userid),
        api.getTransactions(user.userid),
        api.getCategories(),
      ])
      setAccounts(Array.isArray(accs)?accs:[])
      setTransactions(Array.isArray(txs)?txs:[])
      setCategories(Array.isArray(cats)?cats:[])
    } catch { showToast('Erro ao carregar dados.', true) }
    finally { setLoading(false) }
  }, [user.userid])

  useEffect(()=>{ loadData() }, [loadData])

  useEffect(()=>{
    if(!menuOpen) return
    const close = ()=>setMenuOpen(false)
    setTimeout(()=>window.addEventListener('click',close,{once:true}),0)
    return ()=>window.removeEventListener('click',close)
  }, [menuOpen])

  const handleContaSubmit = async (data) => {
    try { await api.createAccount(user.userid, data); showToast('Conta criada!'); setModal(null); loadData() }
    catch(e) { showToast(e.message||'Erro ao criar conta.', true) }
  }

  const handleDeleteConta = async (accountId) => {
    if(!confirm('Excluir esta conta?')) return
    try { await api.deleteAccount(accountId); showToast('Conta excluída.'); loadData() }
    catch(e) { showToast('Erro ao excluir conta.', true) }
  }

  const handleTransacaoSubmit = async (data) => {
    try {
      await api.createTransaction({ ...data, userId: user.userid })
      showToast(data.amount>0?'Receita adicionada!':'Gasto adicionado!')
      setModal(null); loadData()
    } catch(e) { showToast(e.message||'Erro ao salvar.', true) }
  }

  const initials = (user.name||'U').split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2)
  const titles = { dashboard:'Dashboard', contas:'Contas', transacoes:'Transações' }

  const Page = {
    dashboard:  <Dashboard accounts={accounts} transactions={transactions} onAdd={setModal}/>,
    contas:     <Contas accounts={accounts} onAdd={setModal} onDelete={handleDeleteConta} onRefresh={loadData}/>,
    transacoes: <Transacoes transactions={transactions} onAdd={setModal} onRefresh={loadData}/>,
  }[active]

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="side-logo"><span className="mark">H</span><span>HelpFy<span style={{color:'var(--accent)'}}>.</span></span></div>
        <div className="side-section">Principal</div>
        {NAV.map(n=>(
          <button key={n.id} className={`side-item${active===n.id?' active':''}`} onClick={()=>setActive(n.id)}>
            <span className="side-ico">{n.ico}</span>
            <span>{n.label}</span>
          </button>
        ))}
        <div className="side-bottom">
          <div className="side-profile">
            <span className="avatar">{initials}</span>
            <div className="who"><div className="name">{user.name}</div><div className="plan">{user.email}</div></div>
            <button onClick={logout}><I.Logout style={{width:18,height:18}}/></button>
          </div>
        </div>
      </aside>

      {/* HEADER */}
      <header className="header">
        <h1>{titles[active]}<small>{todayLabel()}</small></h1>
        <div className="header-actions">
          <div style={{position:'relative'}}>
            <button className="btn-cta" onClick={e=>{e.stopPropagation();setMenuOpen(v=>!v)}}>
              <I.Plus style={{width:14,height:14}}/> Adicionar
            </button>
            {menuOpen && (
              <div onClick={e=>e.stopPropagation()} style={{position:'absolute',top:'calc(100% + 10px)',right:0,background:'var(--bg)',border:'1px solid var(--border)',borderRadius:18,boxShadow:'0 20px 60px oklch(0.18 0.02 240 / 0.18)',padding:8,width:260,zIndex:50,animation:'modalIn 0.18s ease both'}}>
                <button onClick={()=>{setModal('conta');setMenuOpen(false)}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px',borderRadius:12,border:'none',background:'transparent',cursor:'pointer',textAlign:'left'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--surface-2)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:38,height:38,borderRadius:11,background:'var(--surface-2)',border:'1px solid var(--border)',display:'grid',placeItems:'center',flexShrink:0,color:'var(--ink-2)'}}>
                    <I.Wallet style={{width:17,height:17}}/>
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'var(--ink)'}}>Nova conta</div>
                    <div style={{fontSize:12,color:'var(--ink-3)',marginTop:1}}>Banco, carteira, investimento</div>
                  </div>
                </button>
                <div style={{display:'flex',alignItems:'center',gap:8,padding:'4px 12px',margin:'2px 0'}}>
                  <div style={{flex:1,height:1,background:'var(--border)'}}/>
                  <span style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'var(--ink-4)'}}>Transações</span>
                  <div style={{flex:1,height:1,background:'var(--border)'}}/>
                </div>
                <button onClick={()=>{setModal('receita');setMenuOpen(false)}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px',borderRadius:12,border:'none',background:'transparent',cursor:'pointer',textAlign:'left'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--accent-soft)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:38,height:38,borderRadius:11,background:'var(--accent-soft)',display:'grid',placeItems:'center',flexShrink:0,color:'var(--accent)'}}>
                    <I.Income style={{width:17,height:17}}/>
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'var(--ink)'}}>Nova receita</div>
                    <div style={{fontSize:12,color:'var(--ink-3)',marginTop:1}}>Entrada de dinheiro</div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:12,fontWeight:700,color:'var(--accent)',background:'var(--accent-soft)',padding:'3px 9px',borderRadius:100}}>+</div>
                </button>
                <button onClick={()=>{setModal('gasto');setMenuOpen(false)}} style={{width:'100%',display:'flex',alignItems:'center',gap:12,padding:'12px',borderRadius:12,border:'none',background:'transparent',cursor:'pointer',textAlign:'left'}}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--danger-soft)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{width:38,height:38,borderRadius:11,background:'var(--danger-soft)',display:'grid',placeItems:'center',flexShrink:0,color:'var(--danger)'}}>
                    <I.Expense style={{width:17,height:17}}/>
                  </div>
                  <div>
                    <div style={{fontWeight:700,fontSize:14,color:'var(--ink)'}}>Novo gasto</div>
                    <div style={{fontSize:12,color:'var(--ink-3)',marginTop:1}}>Saída de despesa</div>
                  </div>
                  <div style={{marginLeft:'auto',fontSize:12,fontWeight:700,color:'var(--danger)',background:'var(--danger-soft)',padding:'3px 9px',borderRadius:100}}>−</div>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main" key={active}>
        {loading ? (
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'60vh',flexDirection:'column',gap:16,color:'var(--ink-3)'}}>
            <div className="spinner"/><span>Carregando dados…</span>
          </div>
        ) : <div className="fade-in">{Page}</div>}
      </main>

      {/* MODAIS */}
      {modal==='conta' && <ContaModal onClose={()=>setModal(null)} onSubmit={handleContaSubmit}/>}
      {(modal==='receita'||modal==='gasto') && (
        <TransacaoModal kind={modal} onClose={()=>setModal(null)} onSubmit={handleTransacaoSubmit} accounts={accounts} categories={categories}/>
      )}

      {/* TOAST */}
      {toast && (
        <div className={`toast${toast.isError?' error-toast':''}`}>
          {!toast.isError && <span className="check"><svg viewBox="0 0 24 24" width="14" height="14" fill="none"><path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg></span>}
          {toast.msg}
        </div>
      )}
    </div>
  )
}

// ============ ROOT ============
export default function App() {
  const { user } = useAuth()
  if (!user) return <Login/>
  return <AppShell/>
}
