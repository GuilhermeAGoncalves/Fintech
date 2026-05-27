import { useEffect } from 'react'
import * as I from './Icons'

export default function Modal({ title, sub, icoClass = '', onClose, onSubmit, submitLabel = 'Salvar', submitClass = 'btn btn-accent', canSubmit = true, children }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className={`modal-head-ico ${icoClass}`}>
            <I.Plus style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <div className="modal-title">{title}</div>
            {sub && <div className="modal-sub">{sub}</div>}
          </div>
          <button className="modal-close" onClick={onClose}>
            <I.X style={{ width: 16, height: 16 }} />
          </button>
        </div>

        <div className="modal-body">{children}</div>

        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className={submitClass} onClick={onSubmit} disabled={!canSubmit}>
            {submitLabel} <I.Arrow style={{ width: 14, height: 14 }} />
          </button>
        </div>
      </div>
    </div>
  )
}
