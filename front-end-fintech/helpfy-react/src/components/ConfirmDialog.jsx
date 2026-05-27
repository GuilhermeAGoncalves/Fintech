import * as I from './Icons'

export default function ConfirmDialog({ title, message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 400 }} onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <div className="modal-head-ico danger">
            <I.Warning style={{ width: 18, height: 18 }} />
          </div>
          <div>
            <div className="modal-title">{title}</div>
          </div>
          <button className="modal-close" onClick={onCancel}>
            <I.X style={{ width: 16, height: 16 }} />
          </button>
        </div>
        <div className="modal-body">
          <p style={{ color: 'var(--ink-2)', fontSize: 14, lineHeight: 1.6 }}>{message}</p>
        </div>
        <div className="modal-foot">
          <button className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <I.Trash style={{ width: 14, height: 14 }} /> Excluir
          </button>
        </div>
      </div>
    </div>
  )
}
