import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import * as I from './Icons'

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', Icon: I.Home },
  { to: '/app/config',    label: 'Configurações', Icon: I.Cog },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const initials = user?.name?.split(' ').map(n => n[0]).slice(0, 2).join('') || 'U'

  return (
    <aside className="sidebar">
      <NavLink to="/" className="side-logo">
        <span className="mark">H</span>
        <span>HelpFy<span style={{ color: 'var(--accent)' }}>.</span></span>
      </NavLink>

      <div className="side-section">Principal</div>
      {NAV.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => `side-item${isActive ? ' active' : ''}`}
        >
          <Icon className="side-ico" style={{ width: 18, height: 18 }} />
          <span>{label}</span>
        </NavLink>
      ))}

      <div className="side-bottom">
        <div className="side-profile">
          <span className="avatar">{initials}</span>
          <div>
            <div className="name">{user?.name}</div>
            <div className="plan">Plano {user?.plan || 'gratuito'}</div>
          </div>
          <button className="logout-btn" onClick={logout} title="Sair">
            <I.Logout style={{ width: 16, height: 16 }} />
          </button>
        </div>
      </div>
    </aside>
  )
}
