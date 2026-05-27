import { useAuth } from '../context/AuthContext'
import * as I from '../components/Icons'

export default function Config() {
  const { user } = useAuth()

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="grid grid-2">
        <div className="card">
          <div className="card-h"><h3>Perfil</h3></div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 18 }}>
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 22, flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 16 }}>{user?.name || '—'}</div>
              <div style={{ color: 'var(--ink-3)', fontSize: 13 }}>{user?.email || '—'}</div>
            </div>
            <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>Editar</button>
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label className="field-label">Nome</label>
            <input className="field-input" defaultValue={user?.name || ''} />
          </div>
          <div className="field" style={{ marginBottom: 12 }}>
            <label className="field-label">E-mail</label>
            <input className="field-input" defaultValue={user?.email || ''} />
          </div>
          <div className="field">
            <label className="field-label">Telefone</label>
            <input className="field-input" placeholder="+55 11 99999-0000" />
          </div>
        </div>

        <div className="card">
          <div className="card-h"><h3>Plano &amp; Segurança</h3></div>
          <div className="card" style={{ padding: 18, marginBottom: 14, border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <I.Goal style={{ width: 18, height: 18 }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Plano {user?.plan || 'gratuito'}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>3 objetivos · contas ilimitadas</div>
              </div>
              <button className="btn btn-accent btn-sm">Upgrade</button>
            </div>
          </div>
          {[
            { label: 'Autenticação 2FA', value: 'Ativa', color: 'var(--accent)' },
            { label: 'Última troca de senha', value: '12 dias atrás', color: 'var(--ink-3)' },
            { label: 'Sessões ativas', value: '2 dispositivos', color: 'var(--ink-3)' },
          ].map(row => (
            <div key={row.label} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>{row.label}</span>
              <span style={{ color: row.color, fontWeight: 600, fontSize: 12 }}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
