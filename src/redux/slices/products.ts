import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Product } from '../../utils/types/product';
import {
	addProduct,
	deleteProduct,
	fetchProducts,
} from '../../api/productsFetch';

interface ProductsState {
	products: Product[];
	isProductsLoading: boolean;
	errorOnProducts: string;
	isProductAdding: boolean;
	errorOnProductAdding: string;
}

const initialState: ProductsState = {
	products: [],
	isProductsLoading: false,
	errorOnProducts: '',
	isProductAdding: false,
	errorOnProductAdding: '',
};

export const loadProducts = createAsyncThunk('products/loadProducts', () =>
	fetchProducts()
);

export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (product: Product, { rejectWithValue }) => {
		try {
			const newProduct = await addProduct(product);
			return newProduct;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	}
);

export const deleteProductThunk = createAsyncThunk(
	'products/deleteProduct',
	async (productId: string, { rejectWithValue }) => {
		try {
			await deleteProduct(productId);
			return productId;
		} catch (error) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
			return rejectWithValue('Unknown error');
		}
	}
);

export const productsSlice = createSlice({
	name: 'products',
	initialState: initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(loadProducts.pending, state => {
				state.isProductsLoading = true;
			})
			.addCase(
				loadProducts.fulfilled,
				(state, action: PayloadAction<Product[]>) => {
					return {
						...state,
						products: action.payload,
						isProductsLoading: false,
					};
				}
			)
			.addCase(loadProducts.rejected, state => {
				state.errorOnProducts = 'Error loading products';
				state.isProductsLoading = false;
			})
			.addCase(createProduct.pending, state => {
				state.isProductAdding = true;
				state.errorOnProductAdding = '';
			})
			.addCase(
				createProduct.fulfilled,
				(state, action: PayloadAction<Product>) => {
					state.products.push(action.payload);
					state.isProductAdding = false;
				}
			)
			.addCase(createProduct.rejected, (state, action) => {
				state.errorOnProductAdding = action.payload as string;
				state.isProductAdding = false;
			})
			.addCase(
				deleteProductThunk.fulfilled,
				(state, action: PayloadAction<string>) => {
					state.products = state.products.filter(
						product => product.id !== action.payload
					);
				}
			);
	},
});
