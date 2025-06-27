import type { Product } from "../utils/types/product";

const apiUrl = 'http://localhost:3000/products';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

function get<T>(): Promise<T> {
  const fullUrl = apiUrl

  return wait(300)
    .then(() => fetch(fullUrl))
    .then(res => res.json());
}

export const addProduct = async (product: Product) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to add product');
  }

  return await response.json();
};


export const deleteProduct = async (id: string): Promise<string> => {
  const response = await fetch(`http://localhost:3000/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return id;
};


export const fetchProducts = () => get<Product[]>();
