import { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './redux/reduxHooks';
import { loadProducts } from './redux/slices/products';
import { AddProductModal } from './components/AddProductModal';
import { ProductCard } from './components/ProductCard';

const App = () => {
	const dispatch = useAppDispatch();
	const { products } = useAppSelector(state => state.products);
	const [isClicked, setIsClicked] = useState(false);

	const handleClickForm = () => {
		setIsClicked(!isClicked);
	};

	useEffect(() => {
		dispatch(loadProducts());
	}, [dispatch]);

	return (
		<div className="flex flex-col pb-4 pl-6 pr-6 pt-4">
			<div className="mb-4 flex justify-center">
				<button
					className="flex items-center justify-center rounded-md bg-pink-600 p-3 font-semibold text-cyan-50"
					onClick={handleClickForm}
				>
					Add product
				</button>
			</div>

			{isClicked && (
				<div className="absolute z-50 self-center">
					<AddProductModal handleClickForm={handleClickForm} />
				</div>
			)}

			<div className="grid grid-flow-row grid-cols-5 gap-6 rounded-md border-2 pb-3 pl-4 pr-4 pt-3">
				{products.map(product => (
					<ProductCard product={product} key={product.id} />
				))}
			</div>
		</div>
	);
};

export default App;
