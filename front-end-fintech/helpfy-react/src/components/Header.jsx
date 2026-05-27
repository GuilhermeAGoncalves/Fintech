import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import * as I from './Icons'

const TITLES = {
  '/app/dashboard': { t: 'Dashboard',      s: 'Visão geral das suas finanças' },
  '/app/config':    { t: 'Configurações',   s: 'Conta, segurança, preferências' },
}

export default function Header({ onAdd }) {
  const { pathname } = useLocation()
  const { t, s } = TITLES[pathname] ?? { t: 'HelpFy', s: '' }
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    setTimeout(() => window.addEventListener('click', close, { once: true }), 0)
    return () => window.removeEventListener('click', close)
  }, [menuOpen])

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
        <div style={{ position: 'relative' }}>
          <button
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}
          >
            <I.Plus style={{ width: 14, height: 14 }} /> Adicionar
          </button>
          {menuOpen && (
            <div className="add-menu" onClick={e => e.stopPropagation()}>
              <button className="add-menu-item" onClick={() => { onAdd?.('receita'); setMenuOpen(false) }}>
                <span className="add-menu-ico"><I.Income style={{ width: 16, height: 16 }} /></span>
                <span>
                  <div>Nova receita</div>
                  <div className="add-menu-sub">Entrada de dinheiro</div>
                </span>
              </button>
              <button className="add-menu-item" onClick={() => { onAdd?.('gasto'); setMenuOpen(false) }}>
                <span className="add-menu-ico danger"><I.Expense style={{ width: 16, height: 16 }} /></span>
                <span>
                  <div>Novo gasto</div>
                  <div className="add-menu-sub">Saída de despesa</div>
                </span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
