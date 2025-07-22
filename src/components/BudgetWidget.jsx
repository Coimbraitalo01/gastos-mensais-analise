export default function BudgetWidget({ expenses = [] }) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const budgetLimit = 3000
  const progress = Math.min((total / budgetLimit) * 100, 100)
  
  const getProgressColor = () => {
    if (progress < 50) return 'bg-green-500'
    if (progress < 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-3 border-b pb-2">🎯 Meta Mensal</h3>
      <div className="space-y-3">
        <div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className={`h-2.5 rounded-full ${getProgressColor()} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-right">
            {progress.toFixed(1)}%
          </p>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Gasto: R$ {total.toFixed(2)}</span>
          <span className="text-gray-500">Limite: R$ {budgetLimit.toFixed(2)}</span>
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">
            {progress >= 100 
              ? '⚠️ Meta atingida!' 
              : progress >= 80 
                ? '💡 Está quase lá!' 
                : '👍 Dentro do orçamento'}
          </p>
        </div>
      </div>
    </div>
  )
}