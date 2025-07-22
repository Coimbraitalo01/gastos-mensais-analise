import { useState } from 'react'

export default function ExpenseForm({ onAddExpense, loading }) {
  const [form, setForm] = useState({
    description: '',
    amount: '',
    category: 'alimentacao'
  })

  const categories = [
    { value: 'alimentacao', label: 'Alimentação' },
    { value: 'transporte', label: 'Transporte' },
    { value: 'moradia', label: 'Moradia' },
    { value: 'lazer', label: 'Lazer' },
    { value: 'saude', label: 'Saúde' },
    { value: 'educacao', label: 'Educação' }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.description || !form.amount) return
    
    onAddExpense({
      ...form,
      amount: parseFloat(form.amount)
    })

    setForm({
      description: '',
      amount: '',
      category: 'alimentacao'
    })
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">➕ Adicionar Despesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <input
            type="text"
            value={form.description}
            onChange={(e) => setForm({...form, description: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Almoço, Uber, etc."
            required
            disabled={loading}
          />
        </div>
        
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={form.amount}
            onChange={(e) => setForm({...form, amount: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="0,00"
            required
            disabled={loading}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <select
            value={form.category}
            onChange={(e) => setForm({...form, category: e.target.value})}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            disabled={loading}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded transition
            ${loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:scale-[1.02]'}`}
          disabled={loading}
        >
          {loading ? 'Adicionando...' : 'Adicionar Despesa'}
        </button>
      </form>
    </div>
  )
}