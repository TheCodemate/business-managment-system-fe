import { useQuery } from "@tanstack/react-query";
import { getCartItems, getCustomers } from "./controllers";

export const useCartItems = () => {
  return useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });
};

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
};
