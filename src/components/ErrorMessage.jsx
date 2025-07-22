export default function ErrorMessage({ message }) {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
      <p>{message || 'Ocorreu um erro'}</p>
    </div>
  )
}