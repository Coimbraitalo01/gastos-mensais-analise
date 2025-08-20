import { useState, useEffect, useRef } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { toast, Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, TrendingUp, PieChart, BarChart } from 'react-feather';

const categories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Lazer',
  'Saúde',
  'Educação',
  'Vestuário',
  'Serviços',
  'Investimentos',
  'Outros'
];

const periodFilters = [
  { id: 'month', label: 'Este Mês' },
  { id: 'week', label: 'Últimos 7 dias' },
  { id: 'quarter', label: 'Trimestre' },
  { id: 'year', label: 'Este Ano' }
];

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: '',
    value: '',
    category: 'Alimentação'
  });
  const [filter, setFilter] = useState('all');
  const [periodFilter, setPeriodFilter] = useState('month');
  const [monthlyLimit, setMonthlyLimit] = useState(3000);
  const [savingsGoal, setSavingsGoal] = useState(1000);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const buttonRef = useRef(null);
  const modalRef = useRef(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedExpenses = localStorage.getItem('expenses');
    const savedLimit = localStorage.getItem('monthlyLimit');
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedExpenses) setExpenses(JSON.parse(savedExpenses));
    if (savedLimit) setMonthlyLimit(Number(savedLimit));
    if (savedTheme) setDarkMode(savedTheme === 'true');
  }, []);

  // Salvar dados no localStorage
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('monthlyLimit', monthlyLimit.toString());
    localStorage.setItem('darkMode', darkMode.toString());
  }, [expenses, monthlyLimit, darkMode]);

  // Fechar modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) && 
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setShowLimitModal(false);
      }
    };

    if (showLimitModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showLimitModal]);

  // Dados do gráfico de linha
  const chartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
    datasets: [{
      label: 'Gastos Mensais',
      data: [2500, 3200, 2950, 4100, 3800, 4300],
      borderColor: '#2563eb',
      backgroundColor: 'rgba(37, 99, 235, 0.1)',
      tension: 0.4,
      fill: true
    }]
  };

  // Dados do gráfico de pizza
  const categoryChartData = {
    labels: categories,
    datasets: [{
      data: categories.map(cat => 
        expenses.filter(e => e.category === cat).reduce((sum, e) => sum + e.value, 0)
      ),
      backgroundColor: [
        '#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6',
        '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#64748b'
      ]
    }]
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    
    const expenseValue = Number(newExpense.value);
    const currentMonthTotal = expenses.reduce((total, expense) => {
      return total + expense.value;
    }, 0);

    if (currentMonthTotal + expenseValue > monthlyLimit) {
      toast.error('⚠️ Atenção: Este gasto ultrapassa seu limite mensal!');
      return;
    }

    const newExpenseObj = {
      ...newExpense,
      id: Date.now(),
      value: expenseValue,
      date: new Date().toLocaleDateString('pt-BR'),
      timestamp: new Date().getTime()
    };

    setExpenses([...expenses, newExpenseObj]);
    
    if ((currentMonthTotal + expenseValue) / monthlyLimit > 0.8) {
      toast('⚠️ Você está próximo do limite mensal!', {
        icon: '⚠️',
        style: {
          background: '#FEF3C7',
          color: '#92400E'
        }
      });
    }

    setNewExpense({
      description: '',
      value: '',
      category: 'Alimentação'
    });

    toast.success('Despesa adicionada com sucesso!');
  };

  // Exportar para CSV
  const exportToCSV = () => {
    const csv = [
      ['Data', 'Descrição', 'Categoria', 'Valor (R$)'],
      ...expenses.map(expense => [
        expense.date,
        expense.description,
        expense.category,
        expense.value.toFixed(2)
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `despesas-${new Date().toLocaleDateString('pt-BR')}.csv`;
    a.click();
    
    toast.success('Dados exportados com sucesso! 📊');
  };

  const filteredExpenses = filter === 'all' 
    ? expenses 
    : expenses.filter(expense => expense.category === filter);

  const currentMonthTotal = expenses.reduce((total, expense) => total + expense.value, 0);
  const progressPercentage = (currentMonthTotal / monthlyLimit) * 100;
  const remaining = monthlyLimit - currentMonthTotal;
  const savingsProgress = Math.max(0, remaining - savingsGoal);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'} p-6 font-sans transition-colors duration-300`}>
      <Toaster position="top-right" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-lg shadow-sm p-6 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold">Controle Financeiro</h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sistema de Gestão de Despesas</p>
              
              {/* Estatísticas Rápidas */}
              <div className="flex gap-3 mt-4 flex-wrap">
                <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700'}`}>
                  📊 {expenses.length} despesas
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700'}`}>
                  💰 R$ {currentMonthTotal.toFixed(2)} total
                </div>
                <div className={`px-3 py-1 rounded-full text-sm ${
                  remaining >= 0 
                    ? (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-700')
                    : (darkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-700')
                }`}>
                  {remaining >= 0 ? '✅' : '⚠️'} R$ {Math.abs(remaining).toFixed(2)} {remaining >= 0 ? 'restante' : 'excedido'}
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                  darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <Download size={16} />
                Exportar
              </button>
              
              <button
                ref={buttonRef}
                onClick={() => setShowLimitModal(!showLimitModal)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Definir Limite
              </button>

              <button 
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>

          {/* Modal Posicionado ao Lado do Botão */}
          <AnimatePresence>
            {showLimitModal && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                ref={modalRef}
                className="absolute top-full right-0 mt-2 z-50"
                style={{ right: '0', top: 'calc(100% + 10px)' }}
              >
                <div className={`p-6 rounded-lg shadow-xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} w-96`}>
                  <h2 className="text-xl font-semibold mb-4">Definir Limite Mensal</h2>
                  <input
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                    className={`w-full p-3 rounded-lg mb-4 ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    } border focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Digite o valor do limite"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowLimitModal(false)}
                      className={`flex-1 py-2 rounded-lg font-medium ${
                        darkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => {
                        setShowLimitModal(false);
                        toast.success('Limite mensal definido com sucesso!');
                      }}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-lg shadow-sm p-6 mb-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Limite Mensal</h2>
            <span className="text-lg font-medium">
              R$ {currentMonthTotal.toFixed(2)} / R$ {monthlyLimit.toFixed(2)}
            </span>
          </div>
          
          <div className={`w-full rounded-full h-3 mb-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
            <div 
              className={`h-3 rounded-full transition-all duration-300 ${
                progressPercentage > 90 ? 'bg-red-500' : 
                progressPercentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
          
          <div className={`flex justify-between text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <span>0%</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
            <span>100%</span>
          </div>
          
          <div className="text-center">
            <span className={`text-lg font-semibold ${
              remaining < 0 ? 'text-red-500' : 'text-green-500'
            }`}>
              {remaining >= 0 ? `Restante: R$ ${remaining.toFixed(2)}` : `Excedido: R$ ${Math.abs(remaining).toFixed(2)}`}
            </span>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form e Filtros */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add Expense Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h2 className="text-xl font-semibold mb-4">Nova Despesa</h2>
              <form onSubmit={handleAddExpense} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição
                  </label>
                  <input
                    placeholder="Ex: Almoço restaurante"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Valor (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    value={newExpense.value}
                    onChange={(e) => setNewExpense({...newExpense, value: e.target.value})}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Categoria
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense({...newExpense, category: e.target.value})}
                    className={`w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-800'
                    }`}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Adicionar Despesa
                </button>
              </form>
            </motion.div>

            {/* Filtros por Categoria */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className="text-lg font-semibold mb-4">Filtrar por Categoria</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFilter('all')}
                  className={`p-3 rounded-lg text-sm font-medium ${
                    filter === 'all' 
                      ? 'bg-blue-600 text-white' 
                      : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                  }`}
                >
                  Todas
                </button>
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      filter === cat
                        ? 'bg-blue-600 text-white' 
                        : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Filtros por Período */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className="text-lg font-semibold mb-4">Filtrar por Período</h3>
              <div className="grid grid-cols-2 gap-3">
                {periodFilters.map((period) => (
                  <button
                    key={period.id}
                    onClick={() => setPeriodFilter(period.id)}
                    className={`p-3 rounded-lg text-sm font-medium ${
                      periodFilter === period.id
                        ? 'bg-blue-600 text-white' 
                        : (darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200')
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Meta de Economia */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <h3 className="text-lg font-semibold mb-4">Meta de Economia</h3>
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="number"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(Number(e.target.value))}
                  className={`flex-1 p-3 rounded-lg border ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-800'
                  }`}
                  placeholder="Meta de economia"
                />
              </div>
              <div className={`w-full rounded-full h-2 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((savingsProgress / savingsGoal) * 100, 100)}%` }}
                ></div>
              </div>
              <p className={`text-sm text-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {savingsProgress >= savingsGoal ? '🎉 Meta atingida!' : `Faltam R$ ${(savingsGoal - savingsProgress).toFixed(2)}`}
              </p>
            </motion.div>
          </div>

          {/* Right Column - Gráficos e Tabela */}
          <div className="lg:col-span-2 space-y-6">
            {/* Grid de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico de Linha */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={20} />
                  <h2 className="text-xl font-semibold">Evolução Mensal</h2>
                </div>
                <div className="h-64">
                  <Line 
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { 
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: darkMode ? '#374151' : 'white',
                          titleColor: darkMode ? 'white' : '#1f2937',
                          bodyColor: darkMode ? 'white' : '#1f2937',
                          borderColor: '#e5e7eb',
                          borderWidth: 1
                        }
                      },
                      scales: { 
                        y: { 
                          beginAtZero: true,
                          grid: { color: darkMode ? '#374151' : '#f3f4f6' },
                          ticks: { color: darkMode ? '#9ca3af' : '#6b7280' }
                        },
                        x: {
                          grid: { color: darkMode ? '#374151' : '#f3f4f6' },
                          ticks: { color: darkMode ? '#9ca3af' : '#6b7280' }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>

              {/* Gráfico de Pizza */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-lg shadow-sm p-6 border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <PieChart size={20} />
                  <h2 className="text-xl font-semibold">Distribuição por Categoria</h2>
                </div>
                <div className="h-64">
                  <Pie 
                    data={categoryChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom',
                          labels: {
                            color: darkMode ? 'white' : '#1f2937'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Tabela de Despesas */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`rounded-lg shadow-sm border overflow-hidden ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
            >
              <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                <div className="flex items-center gap-2">
                  <BarChart size={20} />
                  <h2 className="text-xl font-semibold">Despesas Registradas</h2>
                </div>
              </div>
              
              {filteredExpenses.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Descrição
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Categoria
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-medium uppercase tracking-wider">
                          Valor
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredExpenses.map((expense) => (
                        <tr key={expense.id} className={darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {expense.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            {expense.description}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {expense.category}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            R$ {expense.value.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-12 text-center">
                  <div className="text-gray-400 text-6xl mb-4">📊</div>
                  <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Nenhuma despesa registrada</p>
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    Adicione sua primeira despesa usando o formulário ao lado
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}