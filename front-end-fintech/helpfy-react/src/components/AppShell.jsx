import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function AppShell() {
  return (
    <div className="app">
      <Sidebar />
      <Header />
      <main className="main">
        <div className="fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
