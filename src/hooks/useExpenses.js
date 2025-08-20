import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useExpenses() {
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const addExpense = (e) => {
    e.preventDefault();
    const form = e.target;
    const newExpense = {
      id: Date.now(),
      description: form.description.value,
      value: parseFloat(form.value.value),
      category: form.category.value
    };
    setExpenses([...expenses, newExpense]);
    form.reset();
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(expenses.map((e) => 
      e.id === id ? { ...e, ...updatedData } : e
    ));
  };

  const totalExpenses = expenses.reduce((sum, e) => sum + e.value, 0);

  return { expenses, addExpense, deleteExpense, updateExpense, totalExpenses };
}