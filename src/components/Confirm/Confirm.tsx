
type Props = {
  confirmDelete: () => void;
  cancelDelete: () => void;
}

const Confirm: React.FC<Props> = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
      <p className="mb-4 text-lg">Are you sure you want to delete this product?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={confirmDelete}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
        <button
          onClick={cancelDelete}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
  )
}

export default Confirm
