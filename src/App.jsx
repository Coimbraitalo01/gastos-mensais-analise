import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/relatorios" element={<div className="p-4">Página de Relatórios (em construção)</div>} />
      </Routes>
    </div>
  )
}

export default App