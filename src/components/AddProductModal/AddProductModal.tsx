import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import { useAppDispatch } from "../../redux/reduxHooks";
import classNames from "classnames";
import { createProduct } from "../../redux/slices/products";
import type { Product } from "../../utils/types/product";

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
    if (typeof field === "string") {
      return field.trim().length === 0;
    }
    if (typeof field === "number") {
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
    if (typeof value === "number" && !Number.isNaN(value)) {
      setProduct(prevProduct => ({
        ...prevProduct,
        size: { ...prevProduct.size, width: value }
      }));
    }
  };

  const handleChangeHeight = (value: number) => {
    if (typeof value === "number" && !Number.isNaN(value)) {
      setProduct(prevProduct => ({
        ...prevProduct,
        size: { ...prevProduct.size, height: value }
      }));
    }
  };

  return (
    <div className="flex flex-col p-12 border-2 border-slate-200 rounded-lg bg-slate-50">
      <h3 className="font-bold text-2xl">Add your product</h3>
      <hr className="border-2 border-slate-600 rounded-sm mb-2 mt-4" />
      <form onSubmit={handleSubmit} className="flex flex-col gap-1">
        <div className="form-field-block">
          <label htmlFor="name" className="field-name">Product name</label>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter product`s name"
            className="form-field"
          />
        </div>

        <div className="form-field-block">
          <label htmlFor="image" className="field-name">Product image</label>
          <input
            type="text"
            value={product.imageUrl}
            onChange={(e) => handleChange('imageUrl', e.target.value)}
            placeholder="Paste product`s image URL or leave empty"
            className="form-field"
          />
        </div>

        <div className="form-field-block">
          <label htmlFor="count" className="field-name">Count</label>
          <input
            type="text"
            value={product.count}
            onChange={(e) => handleChange('count', e.target.value)}
            placeholder="Enter count of products"
            className="form-field"
          />
        </div>

        <div>
          <h4 className="font-bold text-xl">Size</h4>
          <div className="form-field-block flex-row border-2 border-slate-600 pt-1 pb-2 pr-2 pl-2 rounded-md">
            <div className="flex flex-col items-center">
              <label htmlFor="width" className="field-name">Width</label>
              <input
                type="text"
                placeholder="Enter width"
                value={product.size.width}
                onChange={(e) => handleChangeWidth(Number(e.target.value))}
                className="form-field text-center"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="height" className="field-name">Height</label>
              <input
                type="text"
                placeholder="Enter height"
                value={product.size.height}
                onChange={(e) => handleChangeHeight(Number(e.target.value))}
                className="form-field text-center"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between gap-2">
          <button
            type="button"
            className="flex w-full justify-center items-center bg-red-600 pt-2 pb-2 pr-3 pl-3 rounded-md text-cyan-50 font-semibold"
            onClick={handleClickForm}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isButtonDisabled}
            className={classNames(
              "flex w-full justify-center items-center bg-blue-600 pt-2 pb-2 pr-3 pl-3 rounded-md text-cyan-50 font-semibold",
              { "bg-blue-400": isButtonDisabled }
            )}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
