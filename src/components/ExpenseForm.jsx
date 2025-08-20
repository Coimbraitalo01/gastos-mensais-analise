import { useState } from 'react';
import ErrorMessage from './ErrorMessage';

export default function ExpenseForm({ onSubmit }) {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = parseFloat(form.value.value);

    if (value <= 0) {
      setError('Valor deve ser maior que R$ 0');
      return;
    }

    onSubmit({
      description: form.description.value,
      value,
      category: form.category.value
    });
    form.reset();
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <ErrorMessage message={error} />}
      <input
        name="description"
        placeholder="Descrição"
        className="w-full bg-input p-2 rounded border border-gray-700"
        required
      />
      {/* ... outros campos ... */}
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
        Adicionar
      </button>
    </form>
  );
}