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
    <div className="flex flex-col pt-4 pb-4 pr-6 pl-6">
      <div className="flex mb-4">
        <button
          className="flex justify-center items-center bg-blue-600 pt-2 pb-2 pr-3 pl-3 rounded-md text-cyan-50 font-semibold"
          onClick={handleClickForm}
        >
          Add product
        </button>
      </div>

      {isClicked && (
        <div className="z-50 self-center absolute">
          <AddProductModal handleClickForm={handleClickForm} />
        </div>
      )}

      <div className="grid grid-cols-5 grid-flow-row gap-6 border-2 rounded-md pt-3 pb-3 pr-4 pl-4">
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default App;
