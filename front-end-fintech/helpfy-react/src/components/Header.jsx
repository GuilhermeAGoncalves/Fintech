import { useLocation } from 'react-router-dom'
import * as I from './Icons'

const TITLES = {
  '/':              { t: 'Dashboard',    s: 'Visão geral das suas finanças' },
  '/receitas':      { t: 'Receitas',     s: 'Tudo que entrou no seu mês' },
  '/gastos':        { t: 'Gastos',       s: 'Para onde seu dinheiro foi' },
  '/dividas':       { t: 'Dívidas',      s: '3 contratos ativos' },
  '/investimentos': { t: 'Investimentos',s: 'Sua carteira atualizada' },
  '/objetivos':     { t: 'Objetivos',    s: 'Suas metas em andamento' },
  '/relatorios':    { t: 'Relatórios',   s: 'Análise mês a mês' },
}

export default function Header() {
  const { pathname } = useLocation()
  const { t, s } = TITLES[pathname] ?? { t: 'HelpFy', s: '' }

  return (
    <header className="header">
      <h1>{t}<small>{s}</small></h1>

      <div className="header-search">
        <I.Search className="header-search-ico" style={{ width: 16, height: 16 }} />
        <input placeholder="Buscar transações, metas…" />
      </div>

      <div className="header-actions">
        <button className="icon-btn" title="Notificações">
          <I.Bell style={{ width: 18, height: 18 }} />
          <span className="dot" />
        </button>
        <button className="icon-btn" title="Configurações">
          <I.Cog style={{ width: 18, height: 18 }} />
        </button>
      </div>
    </header>
  )
}
