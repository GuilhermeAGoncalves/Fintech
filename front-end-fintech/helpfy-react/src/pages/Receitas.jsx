import { useState } from 'react'
import { useCrud } from '../hooks/useCrud'
import { receitasApi } from '../services/mockApi'
import { useToast } from '../context/ToastContext'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'
import * as I from '../components/Icons'

const brl = n => 'R$ ' + Math.abs(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const CATS = ['Salário', 'Vendas', 'Hora extra', 'Pix recebido', 'Freela', 'Investimentos', 'Outros']
const CONTAS = ['Nubank', 'Itaú', 'Inter', 'Carteira']
const EMPTY = { descricao: '', valor: '', categoria: 'Salário', conta: 'Itaú', data: new Date().toISOString().slice(0, 10) }

function ReceitaForm({ form, setForm }) {
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))
  return (
    <div className="form-grid" style={{ gap: 14 }}>
      <div className="field">
        <label className="field-label">Descrição</label>
        <input className="field-input" value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Ex: Salário mensal" />
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Valor (R$)</label>
          <input className="field-input" type="number" min="0" step="0.01" value={form.valor} onChange={e => set('valor', e.target.value)} placeholder="0,00" />
        </div>
        <div className="field">
          <label className="field-label">Data</label>
          <input className="field-input" type="date" value={form.data} onChange={e => set('data', e.target.value)} />
        </div>
      </div>
      <div className="form-grid-2">
        <div className="field">
          <label className="field-label">Categoria</label>
          <select className="field-input field-select" value={form.categoria} onChange={e => set('categoria', e.target.value)}>
            {CATS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label className="field-label">Conta</label>
          <select className="field-input field-select" value={form.conta} onChange={e => set('conta', e.target.value)}>
            {CONTAS.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default function Receitas() {
  const { items, loading, create, update, remove } = useCrud(receitasApi)
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
    if (!form.descricao || !form.valor) return
    const payload = { ...form, valor: parseFloat(form.valor) }
    if (modal === 'add') { await create(payload); push('Receita adicionada!') }
    else { await update(editId, payload); push('Receita atualizada!') }
    closeModal()
  }

  const handleDelete = async () => {
    await remove(deleteId); push('Receita excluída!'); setDeleteId(null)
  }

  const cats = ['Todas', ...new Set(items.map(i => i.categoria))]
  const filtered = filterCat === 'Todas' ? items : items.filter(i => i.categoria === filterCat)
  const total = filtered.reduce((s, i) => s + i.valor, 0)

  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="page-header">
        <div>
          <h2>Receitas</h2>
          <p>{items.length} lançamentos · total {brl(items.reduce((s, i) => s + i.valor, 0))}</p>
        </div>
        <button className="btn btn-accent" onClick={openAdd}>
          <I.Plus style={{ width: 14, height: 14 }} /> Nova receita
        </button>
      </div>

      <div className="grid grid-4">
        <div className="stat-card">
          <div className="label"><span className="ico"><I.Income style={{ width: 14, height: 14 }} /></span>Total recebido</div>
          <div className="val">{brl(total)}</div>
          <div className="delta up">{filtered.length} lançamentos</div>
        </div>
        <div className="stat-card">
          <div className="label">Maior entrada</div>
          <div className="val" style={{ fontSize: 18 }}>{filtered.length ? filtered.reduce((a, b) => b.valor > a.valor ? b : a).descricao : '—'}</div>
          <div className="delta neutral">{filtered.length ? brl(Math.max(...filtered.map(i => i.valor))) : ''}</div>
        </div>
        <div className="stat-card">
          <div className="label">Lançamentos</div>
          <div className="val">{filtered.length}</div>
        </div>
        <div className="stat-card">
          <div className="label">Média</div>
          <div className="val">{brl(filtered.length ? total / filtered.length : 0)}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 22px', borderBottom: '1px solid var(--border)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} className={`pill${filterCat === c ? ' green' : ''}`} style={{ cursor: 'pointer' }} onClick={() => setFilterCat(c)}>{c}</button>
          ))}
        </div>
        {loading
          ? <div style={{ padding: 40, textAlign: 'center', color: 'var(--ink-3)' }}>Carregando…</div>
          : filtered.length === 0
            ? <div className="empty"><div className="empty-ico"><I.Income style={{ width: 24, height: 24 }} /></div><h3>Nenhuma receita</h3><p>Adicione sua primeira receita clicando acima.</p></div>
            : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr><th>Descrição</th><th>Categoria</th><th>Conta</th><th>Data</th><th>Valor</th><th style={{ textAlign: 'center' }}>Ações</th></tr>
                  </thead>
                  <tbody>
                    {filtered.map(item => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 600 }}>{item.descricao}</td>
                        <td><span className="pill green">{item.categoria}</span></td>
                        <td>{item.conta}</td>
                        <td style={{ color: 'var(--ink-3)' }}>{item.data}</td>
                        <td style={{ fontWeight: 700, color: 'var(--accent)', fontVariantNumeric: 'tabular-nums' }}>+ {brl(item.valor)}</td>
                        <td>
                          <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                            <button className="btn btn-ghost btn-sm" onClick={() => openEdit(item)}><I.Edit2 style={{ width: 13, height: 13 }} /> Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => setDeleteId(item.id)}><I.Trash style={{ width: 13, height: 13 }} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
      </div>

      {modal && (
        <Modal title={modal === 'add' ? 'Nova receita' : 'Editar receita'} onClose={closeModal} onSubmit={handleSave} submitLabel={modal === 'add' ? 'Adicionar' : 'Salvar'} canSubmit={!!form.descricao && !!form.valor}>
          <ReceitaForm form={form} setForm={setForm} />
        </Modal>
      )}
      {deleteId && <ConfirmDialog title="Excluir receita" message="Excluir esta receita permanentemente?" onConfirm={handleDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  )
}
