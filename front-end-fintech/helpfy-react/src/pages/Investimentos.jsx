import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import { investApi } from '../services/mockApi'
import { useToast } from '../context/ToastContext'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const TIPOS = ['Renda fixa', 'Ações', 'ETF', 'Cripto', 'FII', 'Outros']
const EMPTY = { nome: '', tipo: 'Renda fixa', valor: '', rentabilidade: '', lucro: '' }

function InvestForm({ form, setForm }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <div className="form-grid" style={{ gap: 14 }}>
      <div className="field">
        <label className="field-label">Nome do ativo</label>
        <input className="field-input" value={form.nome} onChange={e => set('nome', e.target.value)} placeholder="Ex: Tesouro IPCA+ 2029" autoFocus />
      </div>
      <div className="field">
        <label className="field-label">Tipo</label>
        <select className="field-input field-select" value={form.tipo} onChange={e => set('tipo', e.target.value)}>
          {TIPOS.map(t => <option key={t}>{t}</option>)}
        </select>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Valor investido (R$)</label>
          <input className="field-input" type="number" min="0" step="0.01" value={form.valor} onChange={e => set('valor', e.target.value)} placeholder="0,00" />
        </div>
        <div className="field">
          <label className="field-label">Rentabilidade (%)</label>
          <input className="field-input" type="number" step="0.1" value={form.rentabilidade} onChange={e => set('rentabilidade', e.target.value)} placeholder="5.2" />
        </div>
      </div>
      <div className="field">
        <label className="field-label">Lucro atual (R$)</label>
        <input className="field-input" type="number" step="0.01" value={form.lucro} onChange={e => set('lucro', e.target.value)} placeholder="0,00" />
      </div>
    </div>
  )
}

export default function Investimentos() {
  const { items, loading, create, update, remove } = useCrud(investApi)
  const { push } = useToast()
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState(EMPTY)
  const [editId, setEditId] = useState(null)
  const [deleteId, setDeleteId] = useState(null)

  const openAdd  = () => { setForm(EMPTY); setModal('add') }
  const openEdit = item => { setForm({ ...item }); setEditId(item.id); setModal('edit') }
  const closeModal = () => { setModal(null); setEditId(null) }

  const handleSave = async () => {
    if (!form.nome || !form.valor) return
    const payload = { ...form, valor: parseFloat(form.valor), rentabilidade: parseFloat(form.rentabilidade || 0), lucro: parseFloat(form.lucro || 0) }
    if (modal === 'add') { await create(payload); push('Aporte registrado!') }
    else { await update(editId, payload); push('Investimento atualizado!') }
    closeModal()
  }

  const handleDelete = async () => {
    await remove(deleteId); push('Investimento excluído!'); setDeleteId(null)
  }

  const totalInvest = items.reduce((s, i) => s + i.valor, 0)
  const totalLucro  = items.reduce((s, i) => s + (i.lucro || 0), 0)
  const rentMedia   = items.length ? (items.reduce((s, i) => s + (i.rentabilidade || 0), 0) / items.length).toFixed(1) : 0

  const typeColor = t => ({ 'Renda fixa': 'green', 'Ações': 'blue', 'ETF': 'blue', 'Cripto': 'yellow', 'FII': 'green', 'Outros': '' }[t] || '')

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="page-header">
        <div>
          <h2>Investimentos</h2>
          <p>{items.length} ativos na carteira</p>
        </div>
        <button className="btn btn-primary" style={{ background: 'var(--info)', color: 'oklch(0.99 0 0)' }} onClick={openAdd}>
          <I.Plus style={{ width: 14, height: 14 }} /> Novo aporte
        </button>
      </div>

      <div className="grid grid-3">
        <div className="balance-hero" style={{ background: 'linear-gradient(135deg, oklch(0.58 0.16 250), oklch(0.4 0.16 250))' }}>
          <div className="label">Patrimônio investido</div>
          <div className="val">{brl(totalInvest)}</div>
          <div className="delta" style={{ color: 'oklch(0.85 0.16 155)' }}>↑ +{brl(totalLucro)} lucro total</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico info"><I.Chart style={{ width: 14, height: 14 }} /></span>Rent. média</div>
          <div className="val">{rentMedia > 0 ? '+' : ''}{rentMedia}%</div>
          <div className="delta up">carteira</div>
        </div>
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Coins style={{ width: 14, height: 14 }} /></span>Ativos</div>
          <div className="val">{items.length}</div>
          <div className="delta neutral">na carteira</div>
        </div>
      </div>

      {loading
        ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>Carregando…</div>
        : items.length === 0
          ? <div className="empty card"><div className="empty-ico"><I.Invest style={{ width: 24, height: 24 }} /></div><h3>Nenhum investimento</h3><p>Registre seu primeiro aporte.</p></div>
          : (
            <div className="grid grid-3">
              {items.map(inv => (
                <div key={inv.id} className="card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--info-soft)', color: 'var(--info)', display: 'grid', placeItems: 'center' }}>
                      <I.Invest style={{ width: 18, height: 18 }} />
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => openEdit(inv)}><I.Edit2 style={{ width: 12, height: 12 }} /></button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(inv.id)}><I.Trash style={{ width: 12, height: 12 }} /></button>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>{inv.nome}</div>
                  <div style={{ marginBottom: 12 }}><span className={`pill ${typeColor(inv.tipo)}`}>{inv.tipo}</span></div>
                  <div style={{ fontSize: 24, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{brl(inv.valor)}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: inv.rentabilidade >= 0 ? 'var(--accent)' : 'var(--danger)', marginTop: 4 }}>
                    {inv.rentabilidade >= 0 ? '↑' : '↓'} {inv.rentabilidade}% · {inv.lucro >= 0 ? '+' : ''}{brl(inv.lucro)} lucro
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--ink-3)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Última atualização</span><b style={{ color: 'var(--ink-2)' }}>agora</b>
                  </div>
                </div>
              ))}
            </div>
          )}

      {modal && (
        <Modal title={modal === 'add' ? 'Novo aporte' : 'Editar investimento'} icoClass="info" onClose={closeModal} onSubmit={handleSave} submitLabel={modal === 'add' ? 'Registrar' : 'Salvar'} submitClass="btn btn-primary" canSubmit={!!form.nome && !!form.valor}>
          <InvestForm form={form} setForm={setForm} />
        </Modal>
      )}
      {deleteId && <ConfirmDialog title="Excluir investimento" message="Excluir este ativo da carteira?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
