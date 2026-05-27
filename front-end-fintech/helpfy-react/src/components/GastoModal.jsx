import { useState, useEffect } from 'react'
import Modal from './Modal'
import { createTransaction, listCategories } from '../api/transctions'
import { listAccounts } from '../api/accountId'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

const isoNow = () => new Date().toISOString().slice(0, 16)
const todayLabel = () => { const d = new Date(); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}` }
const fmt = v => { const r = v.replace(/[^\d,]/g,''); const [i='',d] = r.split(','); return d !== undefined ? i.replace(/\B(?=(\d{3})+(?!\d))/g,'.') + ',' + d.slice(0,2) : i.replace(/\B(?=(\d{3})+(?!\d))/g,'.') }
const parse = v => parseFloat((v||'').replace(/\./g,'').replace(',','.')) || 0

export default function GastoModal({ onClose, onDone }) {
  const { push } = useToast()
  const { user } = useAuth()
  const [num, setNum] = useState('')
  const [desc, setDesc] = useState('')
  const [dt, setDt] = useState(isoNow())
  const [accounts, setAccounts] = useState([])
  const [categories, setCategories] = useState([])
  const [accountId, setAccountId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    Promise.all([listAccounts(user.userid), listCategories()])
      .then(([accs, cats]) => {
        const accsArr = Array.isArray(accs) ? accs : []
        const gastos = Array.isArray(cats) ? cats.filter(c => c.type === 'EXPENSE') : []
        setAccounts(accsArr)
        setCategories(gastos)
        if (accsArr.length > 0) setAccountId(accsArr[0].accountId)
        if (gastos.length > 0) setCategoryId(gastos[0].categoryid)
      })
  }, [user.userid])

  const submit = async () => {
    if (loading || !accountId || !categoryId) return
    setLoading(true)
    try {
      await createTransaction({
        userId: user.userid,
        accountId,
        categoryId,
        description: desc || 'Gasto',
        amount: -Math.abs(parse(num)),
        dtTransaction: new Date(dt).toISOString().slice(0, 19),
        status: 'COMPLETED',
      })
      push('Gasto adicionado!')
      onDone?.()
      onClose()
    } catch {
      push('Erro ao salvar gasto.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal title="Novo gasto" sub={`Saída de despesa · ${todayLabel()}`} icoClass="danger" onClose={onClose} onSubmit={submit} submitLabel="Adicionar gasto" submitClass="btn btn-danger" canSubmit={parse(num) > 0 && !!accountId && !!categoryId && !loading}>
      <div className="amount-field danger">
        <div className="amount-lbl">Valor</div>
        <div className="amount-val-row">
          <small>R$</small>
          <input className="amount-edit" type="text" inputMode="numeric" placeholder="0" value={num} onChange={e => setNum(fmt(e.target.value))} autoFocus />
        </div>
        <div className="amount-helper">Use vírgula para centavos · ex: 1.450,00</div>
      </div>

      {accounts.length > 0 ? (
        <div className="field">
          <label className="field-label">Conta</label>
          <div className="chip-select">
            {accounts.map(a => (
              <button key={a.accountId} type="button" className={`chip-opt${accountId === a.accountId ? ' active' : ''}`} onClick={() => setAccountId(a.accountId)}>
                {a.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: 12, background: 'var(--warn-soft)', borderRadius: 10, fontSize: 13, color: 'var(--warn)', fontWeight: 500 }}>
          ⚠️ Crie uma conta primeiro.
        </div>
      )}

      {categories.length > 0 ? (
        <div className="field">
          <label className="field-label">Categoria</label>
          <div className="chip-select">
            {categories.map(c => (
              <button key={c.categoryid} type="button" className={`chip-opt${categoryId === c.categoryid ? ' active' : ''}`} onClick={() => setCategoryId(c.categoryid)}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ padding: 12, background: 'var(--warn-soft)', borderRadius: 10, fontSize: 13, color: 'var(--warn)', fontWeight: 500 }}>
          ⚠️ Nenhuma categoria de gasto encontrada.
        </div>
      )}

      <div className="field">
        <label className="field-label">Data e hora</label>
        <input className="field-input" type="datetime-local" value={dt} onChange={e => setDt(e.target.value)} />
      </div>

      <div className="field">
        <label className="field-label">Descrição (opcional)</label>
        <textarea className="field-input textarea" placeholder="Ex: Supermercado, gasolina..." value={desc} onChange={e => setDesc(e.target.value)} />
      </div>
    </Modal>
  )
}
