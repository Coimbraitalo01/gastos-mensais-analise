import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const CATEGORY_COLORS = {
  alimentacao: '#4BC0C0',
  transporte: '#36A2EB',
  lazer: '#9966FF',
  moradia: '#FF9F40',
  educacao: '#FF6384'
}

export default function ExpenseChart({ expenses }) {
  // Processa dados para o gráfico
  const chartData = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  }

  // Agrupa por categoria
  expenses.forEach(expense => {
    if (!chartData.labels.includes(expense.category)) {
      chartData.labels.push(expense.category)
      chartData.datasets[0].backgroundColor.push(CATEGORY_COLORS[expense.category] || '#CCCCCC')
      chartData.datasets[0].data.push(0)
    }
    
    const index = chartData.labels.indexOf(expense.category)
    chartData.datasets[0].data[index] += expense.amount
  })

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-bold text-lg mb-4">📊 Distribuição por Categoria</h3>
      <div className="h-64">
        <Pie 
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  boxWidth: 12,
                  padding: 20
                }
              }
            }
          }}
        />
      </div>
    </div>
  )
}