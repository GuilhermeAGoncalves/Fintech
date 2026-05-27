import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import * as I from '../components/Icons'
import { register } from "../api/users"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('entrar')
  const [email, setEmail] = useState('lucca@helpfy.com.br')
  const [password, setPassword] = useState('12345678')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')


  const submit = async e => {
    e.preventDefault()
    if (!email || !password) { setError('Preencha todos os campos.'); return }
    if (tab === 'criar' && !name) { setError('Informe seu nome.'); return }
    setLoading(true)
    setError('')
    try {
      if (tab === 'criar') {
        await register(email, password, name)
        setTab('entrar')
      } else {
        await login(email, password)
        navigate('/')
      }
    } catch (err) {
      setError(err?.response?.data?.message || 'E-mail ou senha inválidos.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Painel esquerdo */}
      <aside className="login-side">
        <div className="login-side-logo">
          <span className="mark">H</span>
          <span>HelpFy<span style={{ color: 'var(--accent)' }}>.</span></span>
        </div>
        <div className="login-quote">
          <div className="login-eyebrow">Help Financially</div>
          <h1>
            Seu dinheiro,<br />
            <em>sob controle</em>.<br />
            Sem esforço.
          </h1>
          <p>Acesse sua conta e continue de onde parou. Receitas, gastos, dívidas, investimentos e objetivos — tudo em um lugar.</p>
        </div>
        <div className="login-foot">
          <span>© 2026 HelpFy</span>
          <span>Help Financially</span>
        </div>
      </aside>

      {/* Painel direito */}
      <section className="login-form-col">
        <div className="login-form-inner fade-in">
          <h2>{tab === 'entrar' ? 'Bem-vindo de volta' : 'Crie sua conta'}</h2>
          <p className="sub">{tab === 'entrar' ? 'Entre para gerenciar sua vida financeira.' : 'Comece grátis, sem cartão de crédito.'}</p>

          <div className="login-tabs">
            <button className={`login-tab${tab === 'entrar' ? ' active' : ''}`} onClick={() => setTab('entrar')}>Entrar</button>
            <button className={`login-tab${tab === 'criar' ? ' active' : ''}`} onClick={() => setTab('criar')}>Criar conta</button>
          </div>

          <form onSubmit={submit}>
            {tab === 'criar' && (
              <div className="field" style={{ marginBottom: 14 }}>
                <label className="field-label">Nome completo</label>
                <input className="field-input" onChange={e => setName(e.target.value)} type="text" placeholder="Como devemos te chamar" />
              </div>
            )}
            <div className="field" style={{ marginBottom: 14 }}>
              <label className="field-label">E-mail</label>
              <input className="field-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="voce@email.com" />
            </div>
            <div className="field" style={{ marginBottom: tab === 'entrar' ? 0 : 14 }}>
              <label className="field-label">Senha</label>
              <div style={{ position: 'relative' }}>
                <input className="field-input" type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>
                  {showPw ? <I.EyeOff style={{ width: 16, height: 16 }} /> : <I.Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {tab === 'entrar' && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0 18px' }}>
                <a href="#" style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 13 }}>Esqueci a senha</a>
              </div>
            )}

            {error && <p className="form-error" style={{ marginBottom: 12 }}>{error}</p>}

            <button type="submit" className="login-submit" disabled={loading}>
              {loading ? 'Entrando…' : tab === 'entrar' ? 'Acessar conta' : 'Criar conta grátis'}
              {!loading && <I.Arrow style={{ width: 16, height: 16 }} />}
            </button>
          </form>

          <div className="login-divider">ou continue com</div>
          <div className="oauth-row">
            <button className="oauth">
              <svg viewBox="0 0 24 24" width="16" height="16"><path fill="#EA4335" d="M12 11v3.4h4.7c-.2 1.2-1.5 3.4-4.7 3.4-2.8 0-5.2-2.4-5.2-5.3S9.2 7.2 12 7.2c1.6 0 2.7.7 3.3 1.3l2.3-2.2C16.1 4.9 14.2 4 12 4 7.6 4 4 7.6 4 12s3.6 8 8 8c4.6 0 7.7-3.2 7.7-7.8 0-.5-.1-.9-.1-1.2H12z"/></svg>
              Google
            </button>
            <button className="oauth">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M17.6 13.2c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.1 1.2 9.4.8 1.1 1.8 2.4 3 2.3 1.2-.1 1.7-.8 3.1-.8s1.8.8 3.1.8c1.3 0 2.1-1.1 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1-.1-2.7-1-2.7-4zM15.3 6.4c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z"/></svg>
              Apple
            </button>
          </div>

          <div className="login-cta-foot">
            {tab === 'entrar'
              ? <><span>Novo por aqui? </span><a onClick={() => setTab('criar')}>Crie uma conta grátis</a></>
              : <><span>Já tem conta? </span><a onClick={() => setTab('entrar')}>Entrar</a></>}
          </div>
        </div>
      </section>
    </div>
  )
}
