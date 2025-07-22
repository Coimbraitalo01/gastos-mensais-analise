export default function ExpenseList({ expenses, onRemove, loading }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR')
  }

  if (loading && expenses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Carregando...
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        Nenhuma despesa registrada ainda
      </div>
    )
  }

  return (
    <div className="divide-y">
      {expenses.map((expense) => (
        <div 
          key={expense.id} 
          className="p-4 hover:bg-gray-50 transition flex justify-between items-center"
        >
          <div>
            <h3 className="font-medium">{expense.description}</h3>
            <div className="flex gap-2 text-sm text-gray-500">
              <span className="capitalize">{expense.category}</span>
              <span>•</span>
              <span>{formatDate(expense.date)}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-red-500 font-medium whitespace-nowrap">
              R$ {expense.amount.toFixed(2)}
            </span>
            <button
              onClick={() => onRemove(expense.id)}
              className="text-gray-400 hover:text-red-500 transition"
              title="Remover"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}