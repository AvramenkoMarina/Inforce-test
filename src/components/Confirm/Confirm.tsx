type Props = {
	confirmDelete: () => void;
	cancelDelete: () => void;
};

const Confirm: React.FC<Props> = ({ confirmDelete, cancelDelete }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
			<div className="max-w-sm rounded bg-white p-6 text-center shadow-lg">
				<p className="mb-4 text-lg">
					Are you sure you want to delete this product?
				</p>
				<div className="flex justify-center gap-4">
					<button
						onClick={confirmDelete}
						className="rounded bg-red-600 px-4 py-2 text-white"
					>
						Delete
					</button>
					<button
						onClick={cancelDelete}
						className="rounded bg-gray-300 px-4 py-2"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Confirm;
