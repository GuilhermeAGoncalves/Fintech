import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import ReceitaModal from './ReceitaModal'
import GastoModal from './GastoModal'

export default function AppShell() {
  const [modal, setModal] = useState(null)
  const [refresh, setRefresh] = useState(0)

  const handleDone = () => setRefresh(r => r + 1)

  return (
    <div className="app">
      <Sidebar />
      <Header onAdd={setModal} />
      <main className="main">
        <div className="fade-in" key={refresh}>
          <Outlet context={{ onAdd: setModal, refresh }} />
        </div>
      </main>

      {modal === 'receita' && <ReceitaModal onClose={() => setModal(null)} onDone={handleDone} />}
      {modal === 'gasto'   && <GastoModal   onClose={() => setModal(null)} onDone={handleDone} />}
    </div>
  )
}
