import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useAppDispatch } from '../../redux/reduxHooks';
import classNames from 'classnames';
import { createProduct } from '../../redux/slices/products';
import type { Product } from '../../utils/types/product';

type Props = {
	handleClickForm: () => void;
};

const defaultProduct: Omit<Product, 'id'> = {
	imageUrl: '',
	name: '',
	count: 0,
	size: {
		width: 0,
		height: 0,
	},
	weight: '',
	comments: [],
};

export const AddProductModal: React.FC<Props> = ({ handleClickForm }) => {
	const [product, setProduct] = useState(defaultProduct);
	const dispatch = useAppDispatch();

	const isFieldEmpty = (field: string | number) => {
		if (typeof field === 'string') {
			return field.trim().length === 0;
		}
		if (typeof field === 'number') {
			return field === 0;
		}
	};

	const isButtonDisabled =
		isFieldEmpty(product.name) ||
		isFieldEmpty(product.count) ||
		isFieldEmpty(product.size.width) ||
		isFieldEmpty(product.size.height);
	isFieldEmpty(product.weight);

	const clearForm = () => {
		setProduct(defaultProduct);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const newProductWithId = { ...product, id: uuidv4() };
		dispatch(createProduct(newProductWithId));
		clearForm();
		handleClickForm();
	};

	const handleChange = (field: keyof Product, value: string | number) => {
		setProduct(prevProduct => ({ ...prevProduct, [field]: value }));
	};

	const handleChangeWidth = (value: number) => {
		if (typeof value === 'number' && !Number.isNaN(value)) {
			setProduct(prevProduct => ({
				...prevProduct,
				size: { ...prevProduct.size, width: value },
			}));
		}
	};

	const handleChangeHeight = (value: number) => {
		if (typeof value === 'number' && !Number.isNaN(value)) {
			setProduct(prevProduct => ({
				...prevProduct,
				size: { ...prevProduct.size, height: value },
			}));
		}
	};

	return (
		<div className="flex flex-col rounded-lg border-2 border-slate-200 bg-slate-50 p-12">
			<h3 className="text-2xl font-bold">Add your product</h3>
			<hr className="mb-2 mt-4 rounded-sm border-2 border-slate-600" />
			<form onSubmit={handleSubmit} className="flex flex-col gap-1">
				<div className="form-field-block">
					<label htmlFor="name" className="field-name">
						Product name
					</label>
					<input
						type="text"
						value={product.name}
						onChange={e => handleChange('name', e.target.value)}
						placeholder="Enter product`s name"
						className="form-field"
					/>
				</div>

				<div className="form-field-block">
					<label htmlFor="image" className="field-name">
						Product image
					</label>
					<input
						type="text"
						value={product.imageUrl}
						onChange={e => handleChange('imageUrl', e.target.value)}
						placeholder="Paste product`s image URL or leave empty"
						className="form-field"
					/>
				</div>

				<div className="form-field-block">
					<label htmlFor="count" className="field-name">
						Count
					</label>
					<input
						type="text"
						value={product.count}
						onChange={e => handleChange('count', e.target.value)}
						placeholder="Enter count of products"
						className="form-field"
					/>
				</div>

				<div>
					<h4 className="text-xl font-bold">Size</h4>
					<div className="form-field-block flex-row rounded-md border-2 border-slate-600 pb-2 pl-2 pr-2 pt-1">
						<div className="flex flex-col items-center">
							<label htmlFor="width" className="field-name">
								Width
							</label>
							<input
								type="text"
								placeholder="Enter width"
								value={product.size.width}
								onChange={e => handleChangeWidth(Number(e.target.value))}
								className="form-field text-center"
							/>
						</div>

						<div className="flex flex-col items-center">
							<label htmlFor="height" className="field-name">
								Height
							</label>
							<input
								type="text"
								placeholder="Enter height"
								value={product.size.height}
								onChange={e => handleChangeHeight(Number(e.target.value))}
								className="form-field text-center"
							/>
						</div>
					</div>
				</div>

				<div className="flex flex-row justify-between gap-2">
					<button
						type="button"
						className="flex w-full items-center justify-center rounded-md bg-red-600 pb-2 pl-3 pr-3 pt-2 font-semibold text-cyan-50"
						onClick={handleClickForm}
					>
						Cancel
					</button>
					<button
						type="submit"
						disabled={isButtonDisabled}
						className={classNames(
							'flex w-full items-center justify-center rounded-md bg-blue-600 pb-2 pl-3 pr-3 pt-2 font-semibold text-cyan-50',
							{ 'bg-blue-400': isButtonDisabled }
						)}
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};
