import { TableCell, TableRow } from "../../components/Table/Table";
import {
  useAddToCart,
  useDeleteCartItem,
  useRemoveFromCart,
} from "../../services/mutations";
import { CartItemResponseType } from "../../types";
import { RemoveButton } from "../Buttons/RemoveButton";

type OrderItemRowProps = {
  cartItem: CartItemResponseType;
};

export const OrderItemCard = ({
  cartItem: { product, quantity, cart_item_id },
}: OrderItemRowProps) => {
  const { mutate: addToCart } = useAddToCart();
  const { mutate: removeFromCart } = useRemoveFromCart();
  const { mutate: deleteCartItem } = useDeleteCartItem();

  const getPalletsNumber = (quantity: number, sqmOnPallet: number) => {
    const totalNumberOfPallets = quantity / sqmOnPallet;
    const isGreaterThanOne = totalNumberOfPallets > 1;

    if (isGreaterThanOne) return totalNumberOfPallets.toFixed(2);
    return 1;
  };
  return (
    <TableRow className="w-full bg-bgPrimary rounded-lg px-8 py-4 cursor-pointer first:rounded-l-lg last:rounded-r-lg hover:scale-101 transition-all">
      <TableCell className="flex-col p-4">
        <div className="w-20 h-20">
          <img src={product.images[0]} alt="" />
        </div>
      </TableCell>
      <TableCell className="flex-1 flex flex-col p-4 h-full gap-1">
        <span className="font-bold">{product.brand_name}</span>
        <span className="font-bold">{product.product_name}</span>
        <span className="text-xs text-ellipsis overflow-hidden max-w-[300px] text-nowrap">
          {product.product_description}
        </span>
        <span className="text-xs text-nowrap">Ref: {product.product_code}</span>
      </TableCell>

      <TableCell className="p-4 text-nowrap">{product.price} PLN</TableCell>
      <TableCell className="p-4 text-nowrap">
        {(product.price * quantity).toFixed(2)} PLN
      </TableCell>
      <TableCell className="p-4 text-nowrap">
        {(product.weight * quantity).toFixed(2)} {product.weight_unit}
      </TableCell>
      <TableCell className="p-4 text-nowrap">
        {getPalletsNumber(quantity, Number(product.pallete))}
      </TableCell>
      <TableCell className="p-4 text-nowrap">
        <div className="flex gap-4 justify-between items-center w-1/5 bg-bgPrimary rounded-full">
          <button
            onClick={() => {
              removeFromCart({
                product_id: product.product_id,
                quantity: Number(product.package),
              });
            }}
            className="flex items-center justify-center font-bold bg-details text-primary px-2 aspect-square rounded-lg active:text-details"
          >
            -
          </button>
          <span className="p-1 bg-bgPrimary">
            {Number(quantity).toFixed(2)}
          </span>
          <button
            onClick={() => {
              addToCart({
                product_id: product.product_id,
                quantity: Number(product.package),
              });
            }}
            className="flex items-center justify-center font-bold bg-details text-primary px-2 aspect-square rounded-lg active:text-details"
          >
            +
          </button>
        </div>
      </TableCell>
      <TableCell className="p-4">
        <div className="flex gap-2 font-bold text-xs">
          <RemoveButton onClick={() => deleteCartItem(cart_item_id)} />
        </div>
      </TableCell>
    </TableRow>
  );
};
