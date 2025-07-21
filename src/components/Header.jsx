export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">💰 Gastos Mensais</h1>
        <button className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium">
          Novo Gasto
        </button>
      </div>
    </header>
  )
}