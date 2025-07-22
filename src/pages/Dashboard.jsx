import { useState } from 'react'
import Header from '../components/Header'
import ExpenseForm from '../components/ExpenseForm'
import ExpenseList from '../components/ExpenseList'
import SummaryWidget from '../components/SummaryWidget'
import BudgetWidget from '../components/BudgetWidget'

export default function Dashboard() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(false)

  const handleAddExpense = (newExpense) => {
    setLoading(true)
    setTimeout(() => {
      setExpenses([...expenses, { ...newExpense, id: Date.now(), date: new Date().toISOString() }])
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
            <div className="sticky top-4">
              <ExpenseForm onAddExpense={handleAddExpense} loading={loading} />
            </div>
          </div>

          {/* Coluna Direita */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <ExpenseList 
                expenses={expenses} 
                onRemove={handleRemoveExpense} 
                loading={loading}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}