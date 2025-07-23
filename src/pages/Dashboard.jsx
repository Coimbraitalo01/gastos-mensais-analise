import { useState, useEffect } from 'react'
import Header from '../components/Header'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import SummaryWidget from '../components/SummaryWidget'
import BudgetWidget from '../components/BudgetWidget'
import ExpenseFilters from '../components/ExpenseFilters'
import ExpenseChart from '../components/ExpenseChart'

// Dados mock iniciais
const MOCK_EXPENSES = [
  { id: 1, description: "Supermercado", amount: 250, category: "alimentacao", date: "2025-07-01" },
  { id: 2, description: "Uber", amount: 35, category: "transporte", date: "2025-07-02" },
  { id: 3, description: "Academia", amount: 120, category: "lazer", date: "2025-07-03" },
  { id: 4, description: "Aluguel", amount: 1800, category: "moradia", date: "2025-07-01" },
  { id: 5, description: "Curso online", amount: 300, category: "educacao", date: "2025-07-05" }
]

export default function Dashboard() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('gastos')
    return saved ? JSON.parse(saved) : MOCK_EXPENSES
  })
  const [loading, setLoading] = useState(false)
  const [activeFilter, setActiveFilter] = useState('todas')

  // Filtra despesas
  const filteredExpenses = activeFilter === 'todas' 
    ? expenses 
    : expenses.filter(exp => exp.category === activeFilter)

  // Salva no localStorage
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(expenses))
  }, [expenses])

  const handleAddExpense = (newExpense) => {
    setLoading(true)
    setTimeout(() => {
      setExpenses([...expenses, {
        ...newExpense,
        id: Date.now(),
        date: new Date().toISOString()
      }])
      setLoading(false)
    }, 500)
  }

  const handleRemoveExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  return (
    <>
      <Header />
      
      <main className="container mx-auto p-4 md:p-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Coluna Esquerda */}
          <div className="lg:col-span-1 space-y-6">
            <SummaryWidget expenses={expenses} />
            <BudgetWidget expenses={expenses} />
            <ExpenseChart expenses={expenses} />
            <div className="sticky top-4 space-y-6">
              <ExpenseForm onAddExpense={handleAddExpense} loading={loading} />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="lg:col-span-3 space-y-6">
            <ExpenseFilters 
              activeFilter={activeFilter}
              onFilter={setActiveFilter} 
            />
            
            <ExpenseList 
              expenses={filteredExpenses} 
              onRemove={handleRemoveExpense} 
              loading={loading}
              activeFilter={activeFilter}
            />
          </div>
        </div>
      </main>
    </>
  )
}