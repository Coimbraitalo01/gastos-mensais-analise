import { useState } from 'react'

export default function useExpenses() {
  const [expenses, setExpenses] = useState([
    { id: 1, title: "Mercado", amount: 150, category: "food" }
  ])

  return { expenses, setExpenses }
}