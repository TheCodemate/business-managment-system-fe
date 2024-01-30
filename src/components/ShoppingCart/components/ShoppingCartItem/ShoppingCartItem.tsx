import { ProductType } from "../../../../types";

type Props = {
  product: ProductType;
  quantity: number;
};

export const ShoppingCartItem = ({ product, quantity }: Props) => {
  return (
    <li className="border-b border-details pb-2">
      <div className="flex justify-between ">
        <div className="flex  w-20 h-20">
          <img src={product.images[0]} alt="" />
        </div>
        <div className="flex-1 flex flex-col justify-between p-2">
          <span className="font-bold">{product.productName}</span>
          <span>{product.price}</span>
        </div>
        <div className="flex justify-center items-center p-2">
          <span>{quantity}m2 </span>
        </div>
      </div>
    </li>
  );
};
