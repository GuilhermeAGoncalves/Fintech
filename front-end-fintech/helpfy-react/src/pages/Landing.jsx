import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Landing.css'

const LpIcon = {
  Income: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Expense: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 20V4m0 0l-6 6m6-6l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Debt: p => <svg viewBox="0 0 24 24" fill="none" {...p}><rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M3 10h18M7 15h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  Invest: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 17l5-5 4 4 7-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 8h5v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Goal: p => <svg viewBox="0 0 24 24" fill="none" {...p}><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>,
  Report: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 20V8M10 20V4M16 20v-7M22 20H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  Plus: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/></svg>,
  Bell: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M6 9a6 6 0 0112 0c0 7 3 8 3 8H3s3-1 3-8zM10 21a2 2 0 004 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arrow: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 12h14m0 0l-6-6m6 6l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Back: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M19 12H5m0 0l6 6m-6-6l6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Bag: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M5 8h14l-1 12H6L5 8z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/><path d="M9 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="2"/></svg>,
  House: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M4 11l8-7 8 7v9a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1v-9z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  Plane: p => <svg viewBox="0 0 24 24" fill="none" {...p}><path d="M21 12L3 19l4-7-4-7 18 7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
  Spark: p => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M12 3l1.8 6.2L20 11l-6.2 1.8L12 19l-1.8-6.2L4 11l6.2-1.8L12 3z"/></svg>,
}

function StatusBar() {
  return (
    <div className="lp-status-bar">
      <span>9:30</span>
      <div className="lp-status-icons">
        <span /><span /><span />
        <div className="lp-bat" />
      </div>
    </div>
  )
}

function PhoneDashboard() {
  return (
    <div className="lp-phone">
      <div className="lp-phone-notch" />
      <div className="lp-phone-screen">
        <StatusBar />
        <div className="lp-db">
          <div className="lp-db-head">
            <div className="lp-db-greet">
              Bem-vindo de volta,
              <b>Olá, Modena 👋</b>
            </div>
            <div className="lp-db-avatar">M</div>
          </div>
          <div className="lp-db-balance">
            <div className="lp-db-balance-label">
              Saldo <span className="lp-db-balance-eye" />
            </div>
            <div className="lp-db-balance-value">R$ 10.537,92</div>
            <div className="lp-db-balance-date">
              <span>13/10/2025</span>
              <span className="lp-db-balance-delta">↑ +R$ 1.243,50 este mês</span>
            </div>
          </div>
          <div className="lp-db-actions">
            {[
              { ico: <LpIcon.Income />, label: 'Adicionar\nReceita' },
              { ico: <LpIcon.Goal />, label: 'Adicionar\nObjetivo' },
              { ico: <LpIcon.Invest />, label: 'Adicionar\nInvestim.' },
              { ico: <LpIcon.Expense />, label: 'Adicionar\nGasto' },
            ].map((a, i) => (
              <div key={i} className="lp-db-action">
                <div className="lp-db-action-icon">{a.ico}</div>
                <span style={{ whiteSpace: 'pre-line' }}>{a.label}</span>
              </div>
            ))}
          </div>
          <div className="lp-db-section-title">
            <span>Atividade recente</span>
            <a>Mostrar mais</a>
          </div>
          <div className="lp-db-tx-list">
            {[
              { ico: 'in', title: 'Venda de roupas', sub: 'Entrada · 13/10', amt: '+R$ 250,00', neg: false },
              { ico: 'out', title: 'Compra de produtos', sub: 'Saída · 13/10', amt: '−R$ 46,00', neg: true },
              { ico: 'in', title: 'Hora extra', sub: 'Entrada · 12/10', amt: '+R$ 450,00', neg: false },
              { ico: 'out', title: 'Almoço churrascaria', sub: 'Saída · 12/10', amt: '−R$ 37,50', neg: true },
            ].map((t, i) => (
              <div key={i} className="lp-db-tx">
                <div className={`lp-db-tx-ico ${t.ico === 'out' ? 'out' : ''}`}>
                  {t.ico === 'in' ? <LpIcon.Income /> : <LpIcon.Expense />}
                </div>
                <div className="lp-db-tx-body">
                  <div className="lp-db-tx-title">{t.title}</div>
                  <div className="lp-db-tx-sub">{t.sub}</div>
                </div>
                <div className={`lp-db-tx-amt ${t.neg ? 'neg' : ''}`}>{t.amt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PhoneForm() {
  return (
    <div className="lp-phone lp-phone-sm">
      <div className="lp-phone-notch" />
      <div className="lp-phone-screen">
        <StatusBar />
        <div className="lp-form-mock">
          <div className="lp-form-head">
            <div className="lp-form-back"><LpIcon.Back style={{ width: 16, height: 16 }} /></div>
            <div className="lp-form-title">Nova receita</div>
          </div>
          <div className="lp-form-amount">
            <div className="lp-form-amount-label">Valor da entrada</div>
            <div className="lp-form-amount-value">
              <small>R$</small> 450<small>,00</small>
            </div>
          </div>
          <div className="lp-field">
            <span className="lp-field-label">Data da entrada</span>
            <div className="lp-field-input">14/10/2025 <span style={{ color: 'var(--ink-3)' }}>▾</span></div>
          </div>
          <div className="lp-field">
            <span className="lp-field-label">Banco</span>
            <div className="lp-field-input chip-row">
              <span className="lp-chip active">Nubank</span>
              <span className="lp-chip">Itaú</span>
              <span className="lp-chip">Inter</span>
            </div>
          </div>
          <div className="lp-field">
            <span className="lp-field-label">Grupo</span>
            <div className="lp-field-input chip-row">
              <span className="lp-chip">Salário</span>
              <span className="lp-chip active">Vendas</span>
              <span className="lp-chip">Outros</span>
            </div>
          </div>
          <div className="lp-form-submit">Adicionar receita</div>
        </div>
      </div>
    </div>
  )
}

function Nav() {
  return (
    <nav className="lp-nav">
      <div className="lp-wrap lp-nav-inner">
        <a className="lp-logo" href="#top">
          <span className="lp-logo-mark">H</span>
          <span>HelpFy<span style={{ color: 'var(--accent)', fontWeight: 800 }}>.</span></span>
        </a>
        <div className="lp-nav-links">
          <a href="#produto">Produto</a>
          <a href="#recursos">Recursos</a>
          <a href="#objetivos">Objetivos</a>
          <a href="#faq">Dúvidas</a>
        </div>
        <div className="lp-nav-cta">
          <Link className="lp-btn lp-btn-ghost lp-btn-sm" to="/login">Entrar</Link>
          <Link className="lp-btn lp-btn-primary lp-btn-sm" to="/login">
            Criar conta <LpIcon.Arrow style={{ width: 14, height: 14 }} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="lp-hero">
      <div className="lp-wrap lp-hero-grid">
        <div>
          <div className="lp-eyebrow">
            <span className="lp-eyebrow-dot"><LpIcon.Spark style={{ width: 10, height: 10 }} /></span>
            Help Financially — controle sem burocracia
          </div>
          <h1>
            Seu dinheiro<br />
            <span className="accent-word">simples</span> de<br />
            gerenciar.
          </h1>
          <p className="lp-hero-sub">
            Tenha total controle do seu dinheiro de forma intuitiva.
            Gerencie receitas, gastos, dívidas e investimentos com a praticidade
            que sua vida financeira merece.
          </p>
          <div className="lp-hero-ctas">
            <Link className="lp-btn lp-btn-accent lp-btn-lg" to="/login">
              Acessar conta <LpIcon.Arrow style={{ width: 16, height: 16 }} />
            </Link>
            <Link className="lp-btn lp-btn-ghost lp-btn-lg" to="/login">Ver demonstração</Link>
          </div>
          <div className="lp-hero-trust">
            <div className="lp-avatars">
              <span style={{ background: 'oklch(0.85 0.08 30)' }}>L</span>
              <span style={{ background: 'oklch(0.82 0.1 150)' }}>M</span>
              <span style={{ background: 'oklch(0.78 0.09 250)' }}>A</span>
              <span style={{ background: 'oklch(0.84 0.08 60)' }}>R</span>
              <span>+</span>
            </div>
            <div>
              <div className="lp-stars">★★★★★</div>
              <div style={{ marginTop: 2 }}><b style={{ color: 'var(--ink)' }}>12.4 mil</b> pessoas no controle</div>
            </div>
          </div>
        </div>
        <div className="lp-phone-stage">
          <div className="lp-float-card lp-float-card-1">
            <div className="lp-fc-icon"><LpIcon.Income style={{ width: 18, height: 18 }} /></div>
            <div>
              <div className="lp-fc-label">Receita</div>
              <div className="lp-fc-value up">+ R$ 250,00</div>
            </div>
          </div>
          <PhoneDashboard />
          <div className="lp-float-card lp-float-card-2">
            <div className="lp-fc-icon" style={{ background: 'var(--danger-soft)', color: 'var(--danger)' }}>
              <LpIcon.Expense style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <div className="lp-fc-label">Gasto</div>
              <div className="lp-fc-value down">− R$ 46,00</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Strip() {
  return (
    <section className="lp-strip">
      <div className="lp-wrap lp-strip-inner">
        <div className="lp-strip-label">Integra com seus bancos</div>
        <div className="lp-strip-banks">
          {['Nubank', 'Itaú', 'Bradesco', 'Santander', 'Inter', 'C6', 'BB'].map(b => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

const PILLARS = [
  { tag: '01', icon: <LpIcon.Income />, title: 'Receitas', body: 'Cadastre entradas com 2 toques. Agrupe por origem — salário, freelas, vendas — e visualize por mês.' },
  { tag: '02', icon: <LpIcon.Expense />, title: 'Gastos', body: 'Saídas em categorias claras. Veja para onde seu dinheiro foi sem precisar de planilha.' },
  { tag: '03', icon: <LpIcon.Debt />, title: 'Dívidas', body: 'Cartão, financiamento, parcelado. Acompanhe parcelas e o quanto falta para a liberdade.' },
  { tag: '04', icon: <LpIcon.Invest />, title: 'Investimentos', body: 'Renda fixa, ações, cripto. Acompanhe rendimento mensal sem abrir 4 apps diferentes.' },
]

function Pillars() {
  return (
    <section className="lp-section" id="recursos">
      <div className="lp-wrap">
        <div className="lp-section-head">
          <span className="lp-section-eyebrow">Os 4 pilares</span>
          <h2 className="lp-section-title">Toda sua vida financeira em <em>um lugar</em>.</h2>
          <p className="lp-section-sub">Receitas, gastos, dívidas e investimentos. Sem abrir 5 apps, sem planilha, sem dor de cabeça.</p>
        </div>
        <div className="lp-pillars">
          {PILLARS.map(p => (
            <div className="lp-pillar" key={p.title}>
              <span className="lp-pillar-tag">{p.tag}</span>
              <div className="lp-pillar-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const SHOWCASES = [
  { icon: <LpIcon.Plus />, title: 'Adicionar receita em segundos', body: 'Valor, data, banco, grupo, descrição. Pronto. Sem 7 abas, sem cadastro complicado.' },
  { icon: <LpIcon.Report />, title: 'Relatório que faz sentido', body: 'Veja em quê seu dinheiro entra e sai — por mês, categoria, ou conta. Tudo em um gráfico simples.' },
  { icon: <LpIcon.Bell />, title: 'Lembretes do que importa', body: 'Vencimentos, metas e aportes. Você é avisado antes — não depois da multa.' },
]

function Showcase() {
  const [active, setActive] = useState(0)
  return (
    <section className="lp-section" id="produto" style={{ paddingTop: 0 }}>
      <div className="lp-dark-section">
        <div className="lp-wrap">
          <div className="lp-section-head" style={{ textAlign: 'left', marginLeft: 0, marginBottom: 0 }}>
            <span className="lp-section-eyebrow">O produto</span>
            <h2 className="lp-section-title" style={{ textAlign: 'left' }}>
              Cadastrar é tão simples<br />que <em>vira hábito</em>.
            </h2>
            <p className="lp-section-sub" style={{ textAlign: 'left' }}>
              A maior barreira do controle financeiro é a fricção. No HelpFy, um toque registra. Três toques, um plano.
            </p>
          </div>
          <div className="lp-showcase-grid">
            <div>
              <div className="lp-showcase-features">
                {SHOWCASES.map((s, i) => (
                  <div key={s.title} className={`lp-showcase-feature${i === active ? ' active' : ''}`} onClick={() => setActive(i)}>
                    <div className="lp-sf-icon">{s.icon}</div>
                    <div className="lp-sf-text">
                      <h4>{s.title}</h4>
                      <p>{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lp-showcase-mock">
              <PhoneForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const GOALS = [
  { ico: <LpIcon.Plane />, name: 'Viagem para Europa', current: 7200, target: 12000, deadline: 'Jul/2026' },
  { ico: <LpIcon.House />, name: 'Reserva de emergência', current: 8400, target: 15000, deadline: 'Dez/2026' },
  { ico: <LpIcon.Bag />, name: 'Notebook novo', current: 2800, target: 5500, deadline: 'Mar/2026' },
]

function Goals() {
  return (
    <section className="lp-section" id="objetivos">
      <div className="lp-wrap lp-goals-grid">
        <div>
          <span className="lp-section-eyebrow">Objetivos &amp; metas</span>
          <h2 className="lp-section-title" style={{ textAlign: 'left' }}>
            Aquilo que parecia<br />longe, fica <em>perto</em>.
          </h2>
          <p className="lp-section-sub" style={{ textAlign: 'left', marginBottom: 24 }}>
            Defina o quanto, até quando, e nós quebramos em metas semanais.
            Cada depósito é um passo a mais — e você vê o avanço acontecer.
          </p>
          <Link className="lp-btn lp-btn-primary" to="/login">
            Criar primeiro objetivo <LpIcon.Arrow style={{ width: 14, height: 14 }} />
          </Link>
        </div>
        <div>
          {GOALS.map(g => {
            const pct = Math.round((g.current / g.target) * 100)
            return (
              <div className="lp-goal-card" key={g.name}>
                <div className="lp-goal-head">
                  <div className="lp-goal-name">
                    <div className="lp-goal-ico">{g.ico}</div>
                    <div>
                      <div>{g.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>até {g.deadline}</div>
                    </div>
                  </div>
                  <div className="lp-goal-pct">{pct}%</div>
                </div>
                <div className="lp-goal-bar">
                  <div className="lp-goal-fill" style={{ width: pct + '%' }} />
                </div>
                <div className="lp-goal-meta">
                  <span><b>R$ {g.current.toLocaleString('pt-BR')}</b> guardados</span>
                  <span>de R$ {g.target.toLocaleString('pt-BR')}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Stats() {
  return (
    <section style={{ padding: '32px 0 64px' }}>
      <div className="lp-wrap">
        <div className="lp-stats">
          <div><div className="lp-stat-num">12<em>k</em></div><div className="lp-stat-label">Pessoas controlando a vida financeira</div></div>
          <div><div className="lp-stat-num">R$ <em>240M</em></div><div className="lp-stat-label">Movimentados via HelpFy em 2025</div></div>
          <div><div className="lp-stat-num">4.<em>9</em></div><div className="lp-stat-label">Nota média na App Store</div></div>
          <div><div className="lp-stat-num"><em>3x</em></div><div className="lp-stat-label">Mais hábito que apps tradicionais</div></div>
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  { q: 'O HelpFy é gratuito?', a: 'Sim. O plano gratuito cobre receitas, gastos e até 3 objetivos. O plano Plus libera investimentos avançados, relatórios e contas ilimitadas.' },
  { q: 'Meus dados ficam seguros?', a: 'Criptografia ponta-a-ponta. Os dados são seus — você pode exportar ou excluir tudo a qualquer momento, com 2 cliques.' },
  { q: 'Funciona com meu banco?', a: 'Integramos com os principais: Nubank, Itaú, Bradesco, Santander, Inter, C6, BB. Bancos que não estão na lista funcionam via lançamento manual.' },
  { q: 'Preciso saber de finanças para usar?', a: 'Não. O HelpFy foi feito para quem nunca conseguiu manter uma planilha. Comece registrando uma receita — o resto vem natural.' },
  { q: 'Tem versão web e mobile?', a: 'Sim. Web (este site, logado), iOS e Android. Tudo sincroniza em tempo real.' },
]

function FAQ() {
  const [open, setOpen] = useState(0)
  return (
    <section className="lp-section" id="faq">
      <div className="lp-wrap">
        <div className="lp-section-head">
          <span className="lp-section-eyebrow">Dúvidas frequentes</span>
          <h2 className="lp-section-title">Tudo que você quer <em>saber antes</em>.</h2>
        </div>
        <div className="lp-faq">
          {FAQS.map((f, i) => (
            <div key={f.q} className={`lp-faq-item${open === i ? ' open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
              <div className="lp-faq-q">
                <span>{f.q}</span>
                <span className="lp-faq-q-mark"><LpIcon.Plus style={{ width: 14, height: 14 }} /></span>
              </div>
              <div className="lp-faq-a"><p>{f.a}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTABig() {
  return (
    <section className="lp-cta-big">
      <h2>Pronto para o <em>controle</em>?</h2>
      <p>Leva 60 segundos. Grátis para sempre nas funções essenciais.</p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link className="lp-btn lp-btn-accent lp-btn-lg" to="/login">
          Criar conta gratuita <LpIcon.Arrow style={{ width: 16, height: 16 }} />
        </Link>
        <button className="lp-btn lp-btn-ghost lp-btn-lg" style={{ color: 'var(--bg)', borderColor: 'oklch(0.4 0.02 240)' }}>
          Falar com a equipe
        </button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="lp-footer">
      <div className="lp-wrap">
        <div className="lp-footer-grid">
          <div>
            <a className="lp-logo" href="#top">
              <span className="lp-logo-mark">H</span>
              <span>HelpFy<span style={{ color: 'var(--accent)', fontWeight: 800 }}>.</span></span>
            </a>
            <p className="lp-footer-tag">Help Financially. Um software brasileiro que devolve às pessoas o controle natural sobre o próprio dinheiro.</p>
          </div>
          <div>
            <h5>Produto</h5>
            <ul>
              {['Receitas', 'Gastos', 'Dívidas', 'Investimentos', 'Objetivos'].map(i => <li key={i}><a href="#">{i}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>Empresa</h5>
            <ul>
              {['Sobre', 'Carreiras', 'Imprensa', 'Contato'].map(i => <li key={i}><a href="#">{i}</a></li>)}
            </ul>
          </div>
          <div>
            <h5>Legal</h5>
            <ul>
              {['Termos', 'Privacidade', 'Segurança', 'Status'].map(i => <li key={i}><a href="#">{i}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <span>© 2026 HelpFy — Help Financially.</span>
          <span>feito com cuidado · Lucca de Oliveira Modena</span>
        </div>
      </div>
    </footer>
  )
}

export default function Landing() {
  return (
    <div className="landing-root" id="top">
      <Nav />
      <Hero />
      <Strip />
      <Pillars />
      <Showcase />
      <Goals />
      <Stats />
      <FAQ />
      <CTABig />
      <Footer />
    </div>
  )
}
