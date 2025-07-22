export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">💰 Gastos Mensais</h1>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-blue-200">Dashboard</a>
          <a href="#" className="hover:text-blue-200">Relatórios</a>
        </div>
      </div>
    </nav>
  )
}