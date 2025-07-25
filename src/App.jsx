import React from 'react'

const Card = ({ title, children }) => (
  <div className="bg-card p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold text-primary mb-4">{title}</h2>
    {children}
  </div>
)

export default function App() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white px-4 py-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">📊 Controle de Gastos</h1>
        <nav className="mt-2 text-sm underline text-light">
          <a href="#" className="hover:text-primary">Dashboard</a> ·{" "}
          <a href="#" className="hover:text-primary">Relatórios</a>
        </nav>
      </header>

      <Card title="📈 Resumo Financeiro">
        <p>Total Gastos: <strong>R$ 325,00</strong></p>
        <p>Registros: <strong>4</strong></p>
        <p>Média por Item: <strong>R$ 81,25</strong></p>
      </Card>

      <Card title="🎯 Meta Mensal">
        <p>10,8%</p>
        <p>Gasto: R$ 325,00 | Limite: R$ 3000,00</p>
        <p className="text-green-400 mt-2">👍 Dentro do orçamento</p>
      </Card>

      <Card title="📊 Distribuição por Categoria">
        <div className="bg-[#161b22] p-6 rounded-lg shadow-md mb-6">
        <img src="https://www.chartjs.org/img/chartjs-logo.svg" alt="grafico" className="w-24 opacity-70" />
        </div>
      </Card>

      <Card title="➕ Adicionar Despesa">
        <form className="space-y-4">
          <input placeholder="Descrição" />
          <input type="number" placeholder="Valor (R$)" />
          <select>
            <option>Alimentação</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
          <button type="submit">
            Adicionar
          </button>
        </form>
      </Card>
    </div>
  )
}