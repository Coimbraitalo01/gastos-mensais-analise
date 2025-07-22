import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition">
          💰 Controle de Gastos
        </Link>
        <nav className="flex gap-4">
          <Link 
            to="/" 
            className="hover:text-blue-200 transition px-3 py-1 rounded hover:bg-blue-700"
          >
            Dashboard
          </Link>
          <Link 
            to="/relatorios" 
            className="hover:text-blue-200 transition px-3 py-1 rounded hover:bg-blue-700"
          >
            Relatórios
          </Link>
        </nav>
      </div>
    </header>
  )
}