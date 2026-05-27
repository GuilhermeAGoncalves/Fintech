import { Link } from 'react-router-dom'
import * as I from '../components/Icons'

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="code">404</div>
      <h2>Página não encontrada</h2>
      <p>A rota que você tentou acessar não existe ou foi removida.</p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        <I.Home style={{ width: 16, height: 16 }} />
        Voltar ao Dashboard
      </Link>
    </div>
  )
}
