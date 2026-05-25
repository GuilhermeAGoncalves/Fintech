import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import { dividasApi } from '../services/mockApi'
import { useToast } from '../context/ToastContext'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const CATS = ['Cartão de crédito', 'Empréstimo', 'Financiamento', 'Cheque especial', 'Outros']
const EMPTY = { nome: '', categoria: 'Cartão de crédito', total: '', pago: '', parcela: '', parcelas: '', vencimento: '' }

function DividaForm({ form, setForm }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  const restante = Math.max(0, Number(form.total || 0) - Number(form.pago || 0))
  const pct = form.total > 0 ? Math.round((Number(form.pago || 0) / Number(form.total)) * 100) : 0

  return (
    <div className="form-grid" style={{ gap: 14 }}>
      <div className="field">
        <label className="field-label">Nome da dívida</label>
        <input className="field-input" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Cartão Nubank" autoFocus />
      </div>
      <div className="field">
        <label className="field-label">Categoria</label>
        <select className="field-input field-select" value={form.categoria} onChange={e => set('categoria', e.target.value)}>
          {CATS.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Total da dívida (R$)</label>
          <input className="field-input" type="number" min="0" step="0.01" value={form.total} onChange={e => set('total', e.target.value)} placeholder="0,00" />
        </div>
        <div className="field">
          <label className="field-label">Já pago (R$)</label>
          <input className="field-input" type="number" min="0" step="0.01" value={form.pago} onChange={e => set('pago', e.target.value)} placeholder="0,00" />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Valor da parcela (R$)</label>
          <input className="field-input" type="number" min="0" step="0.01" value={form.parcela} onChange={e => set('parcela', e.target.value)} placeholder="0,00" />
        </div>
        <div className="field">
          <label className="field-label">Nº de parcelas</label>
          <input className="field-input" type="number" min="1" step="1" value={form.parcelas} onChange={e => set('parcelas', e.target.value)} placeholder="12" />
        </div>
      </div>
      <div className="field">
        <label className="field-label">Vencimento (próxima parcela)</label>
        <input className="field-input" type="date" value={form.vencimento} onChange={e => set('vencimento', e.target.value)} />
      </div>
      {form.total > 0 && (
        <div style={{ background: 'var(--danger-soft)', border: '1px solid color-mix(in oklch, var(--danger) 25%, var(--border))', borderRadius: 12, padding: '14px 16px' }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 8 }}>Resumo</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Restante</span>
            <span style={{ fontWeight: 700, color: 'var(--danger)' }}>{brl(restante)}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: pct + '%', background: 'var(--danger)' }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>{pct}% quitado</div>
        </div>
      )}
    </div>
  )
}

export default function Dividas() {
  const { items, loading, create, update, remove } = useCrud(dividasApi)
  const { push } = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [filterCat, setFilterCat] = useState('Todas')

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = item => { setForm({ ...item }); setEditId(item.id); setModal('edit') }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    if (!form.nome || !form.total) return
    const payload = {
      ...form,
      total: parseFloat(form.total),
      pago: parseFloat(form.pago || 0),
      parcela: parseFloat(form.parcela || 0),
      parcelas: parseInt(form.parcelas || 0),
    }
    if (modal === 'add') { await create(payload); push('Dívida registrada!') }
    else { await update(editId, payload); push('Dívida atualizada!') }
    closeModal()
  }

  const handleDelete = async () => {
    await remove(deleteId); push('Dívida excluída!'); setDeleteId(null)
  }

  const cats = ['Todas', ...new Set(items.map(i => i.categoria))]
  const filtered = filterCat === 'Todas' ? items : items.filter(i => i.categoria === filterCat)

  const totalDivida  = items.reduce((s, d) => s + d.total, 0)
  const totalPago    = items.reduce((s, d) => s + (d.pago || 0), 0)
  const totalRestante = totalDivida - totalPago

  const urgency = d => {
    if (!d.vencimento) return 'neutral'
    const days = Math.ceil((new Date(d.vencimento) - new Date()) / 86400000)
    if (days < 0) return 'overdue'
    if (days <= 7) return 'soon'
    return 'ok'
  }

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="page-header">
        <div>
          <h2>Dívidas</h2>
          <p>{items.length} dívidas · {brl(totalRestante)} a quitar</p>
        </div>
        <button className="btn btn-primary" style={{ background: 'var(--danger)', color: 'oklch(0.99 0 0)' }} onClick={openAdd}>
          <I.Plus style={{ width: 14, height: 14 }} /> Nova dívida
        </button>
      </div>

      <div className="grid grid-3">
        <div className="balance-hero" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 25), oklch(0.4 0.22 25))' }}>
          <div className="label">Total em dívidas</div>
          <div className="val">{brl(totalDivida)}</div>
          <div className="delta" style={{ color: 'oklch(0.85 0.1 25)' }}>↓ {brl(totalRestante)} restante</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico danger"><I.Expense style={{ width: 14, height: 14 }} /></span>Já pago</div>
          <div className="val">{brl(totalPago)}</div>
          <div className="delta up">↑ {totalDivida > 0 ? Math.round((totalPago / totalDivida) * 100) : 0}% quitado</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Coins style={{ width: 14, height: 14 }} /></span>Dívidas ativas</div>
          <div className="val">{items.length}</div>
          <div className="delta neutral">registradas</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} className={`pill${filterCat === c ? ' red' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilterCat(c)}>{c}</button>
          ))}
        </div>

        {loading
          ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>Carregando…</div>
          : filtered.length === 0
            ? <div className="empty"><div className="empty-ico"><I.Expense style={{ width: 24, height: 24 }} /></div><h3>Nenhuma dívida</h3><p>Registre sua primeira dívida.</p></div>
            : (
              <div style={{ padding: 20, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                {filtered.map(d => {
                  const pct = d.total > 0 ? Math.round(((d.pago || 0) / d.total) * 100) : 0
                  const restante = d.total - (d.pago || 0)
                  const urg = urgency(d)
                  return (
                    <div key={d.id} className="card" style={{ position: 'relative' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--danger-soft)', color: 'var(--danger)', display: 'grid', placeItems: 'center' }}>
                            <I.Expense style={{ width: 18, height: 18 }} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: 15 }}>{d.nome}</div>
                            <span className="pill red">{d.categoria}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button className="btn btn-ghost btn-sm" onClick={() => openEdit(d)}><I.Edit2 style={{ width: 12, height: 12 }} /></button>
                          <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(d.id)}><I.Trash style={{ width: 12, height: 12 }} /></button>
                        </div>
                      </div>

                      <div className="progress-bar" style={{ marginBottom: 8 }}>
                        <div className="progress-fill" style={{ width: Math.min(pct, 100) + '%', background: 'var(--danger)' }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 14 }}>
                        <span>{pct}% quitado</span>
                        <span style={{ color: 'var(--danger)', fontWeight: 700 }}>{brl(restante)} restante</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
                        {[
                          ['Total', brl(d.total)],
                          ['Parcela', d.parcela ? brl(d.parcela) : '—'],
                          ['Parcelas', d.parcelas ? `${d.parcelas}x` : '—'],
                        ].map(([l, v]) => (
                          <div key={l}>
                            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-3)', fontWeight: 700 }}>{l}</div>
                            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 2 }}>{v}</div>
                          </div>
                        ))}
                      </div>

                      {d.vencimento && (
                        <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: 'var(--ink-3)' }}>Próximo vencimento</span>
                          <span style={{ fontWeight: 700, color: urg === 'overdue' ? 'var(--danger)' : urg === 'soon' ? 'var(--warning, oklch(0.7 0.18 80))' : 'var(--ink-2)' }}>
                            {urg === 'overdue' ? '⚠ ' : ''}{d.vencimento}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Nova dívida' : 'Editar dívida'} icoClass="danger" onClose={closeModal} onSubmit={handleSave} submitLabel={modal === 'add' ? 'Registrar' : 'Salvar'} submitClass="btn btn-danger" canSubmit={!!form.nome && !!form.total}>
          <DividaForm form={form} setForm={setForm} />
        </Modal>
      )}
      {deleteId && <ConfirmDialog title="Excluir dívida" message="Excluir esta dívida permanentemente?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
