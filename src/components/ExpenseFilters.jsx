export default function ExpenseFilters({ activeFilter, onFilter }) {
  const categories = [
    { value: 'todas', label: 'Todas Categorias' },
    { value: 'alimentacao', label: '🍔 Alimentação' },
    { value: 'transporte', label: '🚗 Transporte' },
    { value: 'lazer', label: '🎮 Lazer' },
    { value: 'moradia', label: '🏠 Moradia' },
    { value: 'educacao', label: '📚 Educação' }
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3">🔍 Filtros</h3>
      <select 
        value={activeFilter}
        onChange={(e) => onFilter(e.target.value)}
        className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
      >
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </div>
  )
}