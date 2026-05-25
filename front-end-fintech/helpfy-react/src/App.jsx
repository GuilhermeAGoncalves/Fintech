import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import AppShell from './components/AppShell'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import Gastos from './pages/Gastos'
import Receitas from './pages/Receitas'
import Objetivos from './pages/Objetivos'
import Investimentos from './pages/Investimentos'
import Dividas from './pages/Dividas'
import Relatorios from './pages/Relatorios'

function PrivateRoute() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route element={<AppShell />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/gastos" element={<Gastos />} />
                <Route path="/receitas" element={<Receitas />} />
                <Route path="/objetivos" element={<Objetivos />} />
                <Route path="/investimentos" element={<Investimentos />} />
                <Route path="/dividas" element={<Dividas />} />
                <Route path="/relatorios" element={<Relatorios />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
