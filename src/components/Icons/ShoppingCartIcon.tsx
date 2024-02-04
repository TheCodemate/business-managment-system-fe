import { useCartItems } from "../../services/querries";
import MUIShoppingCartItem from "@mui/icons-material/ShoppingCart";

export const ShoppingCartIcon = () => {
  const { data: cartItems } = useCartItems();
  const numberOfItemsInCart = cartItems?.length;
  return (
    <div className="relative">
      {cartItems && cartItems.length > 0 && (
        <div className="absolute top-[-5px] right-[-5px] flex justify-center items-center bg-redSecondary text-alternate font-bold rounded-full p-1 text-[12px] w-5 h-5">
          {numberOfItemsInCart}
        </div>
      )}
      <MUIShoppingCartItem sx={{ color: "#141414", width: 36, height: 36 }} />
    </div>
  );
};
