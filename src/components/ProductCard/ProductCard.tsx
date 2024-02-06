import { useNavigate } from "react-router-dom";
import { TableRow, TableCell } from "../../components/Table/Table";
import { ProductType } from "../../types";
import { useAddToCart } from "../../services/mutations";
import { Loading } from "../Loading/Loading";

type ProductCardProps = {
  product: ProductType;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { mutate: addToCart, isPending } = useAddToCart();
  return (
    <TableRow
      key={product.product_id}
      className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-101 transition-all"
    >
      <TableCell className="flex-col p-4">
        <div className="w-20 h-20">
          <img src={product.images[0]} alt="" />
        </div>
      </TableCell>
      <TableCell className="flex-1 flex flex-col p-4 h-full">
        <span className="font-bold">{product.product_name}</span>
        <span className="text-xs text-ellipsis overflow-hidden max-w-[300px] text-nowrap">
          {product.product_description}
        </span>
        <span className="text-xs text-nowrap">Ref: {product.product_code}</span>
      </TableCell>
      <TableCell className="p-4">
        <div className="flex gap-1">
          {product.categories.map((category) => (
            <div
              key={category}
              className="p-1 text-xs bg-bgSecondary  font-bold rounded-md"
            >
              {category}
            </div>
          ))}
        </div>
      </TableCell>
      <TableCell className="p-4">Options</TableCell>
      <TableCell className="p-4">{product.price}PLN</TableCell>
      <TableCell className="p-4">{product.stock_amount}m2</TableCell>
      <TableCell className="p-4">{product.product_code}</TableCell>
      <TableCell className="p-4">
        <div className="flex gap-2 font-bold text-xs">
          <button
            onClick={() =>
              navigate(`/products/${product.product_id}`, {
                state: product,
              })
            }
            className="px-4 py-2 bg-bgSecondary rounded-md hover:bg-details transition-all"
          >
            Więcej
          </button>
          <button
            onClick={() =>
              addToCart({
                product_id: product.product_id,
                quantity: Number(product.package),
              })
            }
            className="px-4 py-2 bg-primary text-textAlternate font-bold rounded-md hover:bg-details hover:scale-105 transition-all cursor-pointer "
          >
            {isPending ? <Loading color={"#141414"} /> : "Dodaj"}
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};
