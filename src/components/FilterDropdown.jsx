export default function FilterDropdown({ categories, onFilter }) {
  return (
    <select
      onChange={(e) => onFilter(e.target.value)}
      className="w-full bg-[#161b22] p-2 rounded border border-gray-700 mb-4"
    >
      <option value="all">Todas Categorias</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}