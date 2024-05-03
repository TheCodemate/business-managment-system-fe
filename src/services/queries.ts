import { useQuery } from "@tanstack/react-query";
import {
  getCartItems,
  getCustomers,
  getProducts,
  getUploadedProducts,
} from "./controllers";

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

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useUploadedProducts = () => {
  return useQuery({
    queryKey: ["uploadedProducts"],
    queryFn: getUploadedProducts,
  });
};
