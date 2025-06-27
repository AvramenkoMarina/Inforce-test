import { useState } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import { deleteProductThunk } from "../../redux/slices/products";
import type { Product } from "../../utils/types/product";
import Confirm from "../Confirm/Confirm";

type Props = {
  product: Product;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (!product.id) {
      console.error("Product id is undefined, cannot delete");
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
    <div className="relative flex flex-col pt-2 pb-2 pr-3 pl-3 w-fit min-w-56 border-2 border-slate-800 rounded-md bg-red-50">
      <button
        className="absolute top-2 right-2 w-5 h-5"
        onClick={handleDelete}
      >
        <img src="icons/icons-close.svg" alt="close" />
      </button>

      {showConfirm && (
        <Confirm confirmDelete={confirmDelete} cancelDelete={cancelDelete} />
      )}

      <img
        className="w-40 h-40 object-contain self-center mb-4"
        src={product.imageUrl}
        alt="product photo"
      />

      <h3 className="font-semibold text-2xl mb-2 text-center">{product.name}</h3>
      <hr className="border-2 border-black mb-4" />
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
