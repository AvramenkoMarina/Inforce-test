import { useState } from 'react';
import { useAppDispatch } from '../../redux/reduxHooks';
import { deleteProductThunk } from '../../redux/slices/products';
import type { Product } from '../../utils/types/product';
import Confirm from '../Confirm/Confirm';

type Props = {
	product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
	const dispatch = useAppDispatch();
	const [showConfirm, setShowConfirm] = useState(false);

	const handleDelete = () => {
		if (!product.id) {
			console.error('Product id is undefined, cannot delete');
			return;
		}
		setShowConfirm(true);
	};

	const confirmDelete = () => {
		if (product.id) {
			dispatch(deleteProductThunk(product.id));
		}
		setShowConfirm(false);
	};

	const cancelDelete = () => {
		setShowConfirm(false);
	};

	return (
		<div className="relative flex w-fit min-w-56 flex-col rounded-md border-2 border-slate-800 bg-red-50 pb-2 pl-3 pr-3 pt-2">
			<button className="absolute right-2 top-2 h-5 w-5" onClick={handleDelete}>
				<img src="icons/icons-close.svg" alt="close" />
			</button>

			{showConfirm && (
				<Confirm confirmDelete={confirmDelete} cancelDelete={cancelDelete} />
			)}

			<img
				className="mb-4 h-40 w-40 self-center object-contain"
				src={product.imageUrl}
				alt="product photo"
			/>

			<h3 className="mb-2 text-center text-2xl font-semibold">
				{product.name}
			</h3>
			<hr className="mb-4 border-2 border-black" />
			<div className="flex flex-col">
				<p>
					<b>Count</b>: {product.count}
				</p>
				<p>
					<b>Size</b>: {product.size.width}x{product.size.height}
				</p>
				<p>
					<b>Weight</b>: {product.weight}
				</p>
			</div>
		</div>
	);
};
