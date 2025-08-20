export default function BudgetWidget({ progress, budgetLimit, totalExpenses }) {
  return (
    <div className="bg-card p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold text-primary mb-4">🎯 Meta Mensal</h2>
      <div className="mb-2 flex justify-between">
        <span>Progresso: {progress.toFixed(1)}%</span>
        <span>
          R$ {totalExpenses.toFixed(2)} / R$ {budgetLimit.toFixed(2)}
        </span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}