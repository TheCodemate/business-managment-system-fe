import { useCartItems } from "../../services/querries";

export const CartIcon = () => {
  const { data } = useCartItems();
  console.log("cartItems: ,", data);
  return <div className=""></div>;
};
