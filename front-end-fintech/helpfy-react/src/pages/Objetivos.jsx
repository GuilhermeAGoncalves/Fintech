import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import { objetivosApi } from '../services/mockApi'
import { useToast } from '../context/ToastContext'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const ICOS = ['✈️', '🏠', '💻', '🚗', '🛡️', '❤️', '🎓', '🌟']
const EMPTY = { nome: '', meta: '', atual: '', deadline: '', icone: '✈️' }

function ObjetivoForm({ form, setForm }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const monthsLeft = (() => {
    if (!form.deadline) return 12
    const [y, m] = form.deadline.split('-').map(Number)
    const now = new Date()
    return Math.max(1, (y - now.getFullYear()) * 12 + (m - 1) - now.getMonth())
  })()
  const monthly = Math.ceil(Math.max(0, Number(form.meta) - Number(form.atual || 0)) / monthsLeft)

  return (
    <div className="form-grid" style={{ gap: 14 }}>
      <div className="field">
        <label className="field-label">Nome do objetivo</label>
        <input className="field-input" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Viagem para Europa" autoFocus />
      </div>
      <div className="field">
        <label className="field-label">Ícone</label>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {ICOS.map(ico => (
            <button key={ico} type="button" onClick={() => set('icone', ico)}
              style={{ width: 40, height: 40, borderRadius: 10, fontSize: 20, border: `2px solid ${form.icone === ico ? 'var(--accent)' : 'var(--border)'}`, background: form.icone === ico ? 'var(--accent-soft)' : 'var(--surface)' }}>
              {ico}
            </button>
          ))}
        </div>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Meta total (R$)</label>
          <input className="field-input" type="number" min="0" step="100" value={form.meta} onChange={e => set('meta', e.target.value)} placeholder="12000" />
        </div>
        <div className="field">
          <label className="field-label">Valor atual (R$)</label>
          <input className="field-input" type="number" min="0" step="100" value={form.atual} onChange={e => set('atual', e.target.value)} placeholder="0" />
        </div>
      </div>
      <div className="field">
        <label className="field-label">Prazo (mês/ano)</label>
        <input className="field-input" type="month" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
      </div>
      {form.meta > 0 && (
        <div style={{ background: 'var(--accent-soft)', border: '1px solid color-mix(in oklch, var(--accent) 25%, var(--border))', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 6 }}>Plano sugerido</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--accent)' }}>{brl(monthly)}<span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-3)', marginLeft: 6 }}>/ mês por {monthsLeft} meses</span></div>
        </div>
      )}
    </div>
  )
}

export default function Objetivos() {
  const { items, loading, create, update, remove } = useCrud(objetivosApi)
  const { push } = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = item => { setForm({ ...item, meta: item.meta, atual: item.atual }); setEditId(item.id); setModal('edit') }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    if (!form.nome || !form.meta) return
    const payload = { ...form, meta: parseFloat(form.meta), atual: parseFloat(form.atual || 0) }
    if (modal === 'add') { await create(payload); push('Objetivo criado!') }
    else { await update(editId, payload); push('Objetivo atualizado!') }
    closeModal()
  }

  const handleDelete = async () => {
    await remove(deleteId); push('Objetivo excluído!'); setDeleteId(null)
  }

  const totalMeta  = items.reduce((s, g) => s + g.meta, 0)
  const totalAtual = items.reduce((s, g) => s + g.atual, 0)

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="page-header">
        <div>
          <h2>Objetivos</h2>
          <p>{items.length} metas · {brl(totalAtual)} de {brl(totalMeta)} guardados</p>
        </div>
        <button className="btn btn-accent" onClick={openAdd}>
          <I.Plus style={{ width: 14, height: 14 }} /> Novo objetivo
        </button>
      </div>

      <div className="grid grid-3">
        <div className="balance-hero">
          <div className="label">Total em metas</div>
          <div className="val">{brl(totalAtual)}</div>
          <div className="delta">de {brl(totalMeta)} · {items.length} objetivos</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Goal style={{ width: 14, height: 14 }} /></span>Progresso geral</div>
          <div className="val">{totalMeta ? Math.round((totalAtual / totalMeta) * 100) : 0}%</div>
          <div className="delta up">↑ em andamento</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico info"><I.Coins style={{ width: 14, height: 14 }} /></span>Falta guardar</div>
          <div className="val">{brl(totalMeta - totalAtual)}</div>
          <div className="delta neutral">para atingir todas as metas</div>
        </div>
      </div>

      {loading
        ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>Carregando…</div>
        : items.length === 0
          ? <div className="empty card"><div className="empty-ico"><I.Goal style={{ width: 24, height: 24 }} /></div><h3>Nenhum objetivo</h3><p>Crie seu primeiro objetivo financeiro!</p><button className="btn btn-accent" onClick={openAdd}><I.Plus style={{ width: 14, height: 14 }} /> Criar objetivo</button></div>
          : (
            <div className="grid grid-2">
              {items.map(g => {
                const pct = Math.round((g.atual / g.meta) * 100)
                return (
                  <div key={g.id} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -20, right: -20, width: 80, height: 80, borderRadius: '50%', background: 'var(--accent-soft)', opacity: 0.6 }} />
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16, position: 'relative' }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--accent)', color: 'var(--accent-ink)', display: 'grid', placeItems: 'center', fontSize: 22, flexShrink: 0 }}>{g.icone}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 16 }}>{g.nome}</div>
                        {g.deadline && <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>até {g.deadline}</div>}
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => openEdit(g)}><I.Edit2 style={{ width: 13, height: 13 }} /></button>
                        <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(g.id)}><I.Trash style={{ width: 13, height: 13 }} /></button>
                      </div>
                    </div>
                    <div className="progress-bar" style={{ marginBottom: 8 }}>
                      <div className="progress-fill" style={{ width: Math.min(pct, 100) + '%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                      <span><b>{brl(g.atual)}</b> guardados</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{pct}%</span>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                      {[['Meta', brl(g.meta)], ['Falta', brl(g.meta - g.atual)], ['Progresso', pct + '%']].map(([l, v]) => (
                        <div key={l}><div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 700 }}>{l}</div><div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{v}</div></div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

      {modal && (
        <Modal title={modal === 'add' ? 'Novo objetivo' : 'Editar objetivo'} onClose={closeModal} onSubmit={handleSave} submitLabel={modal === 'add' ? 'Criar objetivo' : 'Salvar'} canSubmit={!!form.nome && !!form.meta}>
          <ObjetivoForm form={form} setForm={setForm} />
        </Modal>
      )}
      {deleteId && <ConfirmDialog title="Excluir objetivo" message="Excluir este objetivo permanentemente?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
