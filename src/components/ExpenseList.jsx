import { useState } from 'react'
import { Trash2, Check, X } from 'react-feather'

export default function ExpenseList({ expenses, onRemove, loading, activeFilter = 'todas' }) {
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [hoveredItem, setHoveredItem] = useState(null)

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'short' }
    return new Date(dateString).toLocaleDateString('pt-BR', options)
  }

  const handleRemove = (id) => {
    setConfirmDelete(id)
  }

  const confirmRemove = (id) => {
    onRemove(id)
    setConfirmDelete(null)
    setHoveredItem(null)
  }

  const cancelRemove = () => {
    setConfirmDelete(null)
    setHoveredItem(null)
  }

  // Estilos dinâmicos
  const categoryColors = {
    alimentacao: 'bg-green-100 text-green-800',
    transporte: 'bg-blue-100 text-blue-800',
    lazer: 'bg-purple-100 text-purple-800',
    moradia: 'bg-yellow-100 text-yellow-800',
    educacao: 'bg-red-100 text-red-800'
  }

  if (loading && expenses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto mb-2"></div>
        Carregando despesas...
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        {activeFilter === 'todas' 
          ? 'Nenhuma despesa registrada ainda' 
          : 'Nenhuma despesa encontrada para esta categoria'}
        <p className="text-sm mt-2 text-gray-400">Clique no botão "+" para adicionar</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {expenses.map((expense) => (
        <div 
          key={expense.id} 
          className="p-4 hover:bg-gray-50 transition flex justify-between items-center relative"
          onMouseEnter={() => setHoveredItem(expense.id)}
          onMouseLeave={() => !confirmDelete && setHoveredItem(null)}
        >
          <div className="flex-1 min-w-0 pr-4">
            <h3 className="font-medium truncate text-gray-800">{expense.description}</h3>
            <div className="flex gap-2 items-center mt-1.5">
              <span className={`${categoryColors[expense.category] || 'bg-gray-100 text-gray-800'} px-2 py-0.5 rounded-full text-xs capitalize`}>
                {expense.category}
              </span>
              <span className="text-xs text-gray-400">{formatDate(expense.date)}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-red-500 font-medium whitespace-nowrap">
              - R$ {expense.amount.toFixed(2)}
            </span>
            
            {confirmDelete === expense.id ? (
              <div className="flex gap-2 bg-white rounded-lg p-1 shadow-sm absolute right-4 top-1/2 transform -translate-y-1/2">
                <button
                  onClick={() => confirmRemove(expense.id)}
                  className="p-1 text-green-500 hover:bg-green-50 rounded"
                  title="Confirmar"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={cancelRemove}
                  className="p-1 text-gray-500 hover:bg-gray-50 rounded"
                  title="Cancelar"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleRemove(expense.id)}
                className={`p-1 rounded transition ${hoveredItem === expense.id ? 'text-red-500 bg-red-50' : 'text-gray-400'}`}
                title="Remover"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}