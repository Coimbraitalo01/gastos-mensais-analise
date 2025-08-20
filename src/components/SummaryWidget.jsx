export default function SummaryWidget({ expenses = [] }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const count = expenses.length

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3 border-b pb-2">📊 Resumo Financeiro</h3>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Total Gastos</p>
          <p className={`text-2xl font-bold ${total > 0 ? 'text-red-500' : 'text-gray-400'}`}>
            R$ {total.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Registros</p>
          <p className="text-2xl font-bold text-blue-500">
            {count}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Média por Item</p>
          <p className="text-xl font-medium text-gray-700">
            {count > 0 ? `R$ ${(total/count).toFixed(2)}` : 'R$ 0,00'}
          </p>
        </div>
      </div>
    </div>
  )
}