import { useState } from 'react';

export default function EditModal({ expense, onSave, onClose }) {
  const [formData, setFormData] = useState({
    description: expense.description,
    value: expense.value,
    category: expense.category
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Despesa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            name="value"
            type="number"
            step="0.01"
            value={formData.value}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Moradia">Moradia</option>
            <option value="Lazer">Lazer</option>
            <option value="Saúde">Saúde</option>
            <option value="Educação">Educação</option>
            <option value="Outros">Outros</option>
          </select>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-800 p-2 rounded"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}