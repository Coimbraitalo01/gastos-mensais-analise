export default function ExpenseList({ expenses }) {
  return (
    <ul className="space-y-2">
      {expenses.map((expense) => (
        <li key={expense.id} className="flex justify-between">
          <span>{expense.description}</span>
          <span className="text-light">
            {expense.category} · R$ {expense.value.toFixed(2)}
          </span>
        </li>
      ))}
    </ul>
  );
}