import { useQuery } from "@tanstack/react-query";
import {
  getCartItems,
  getCustomers,
  getProducts,
  getTechnicalRequests,
  getTechnicalRequestsById,
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

export const useTechnicalRequests = () => {
  return useQuery({
    queryKey: ["technicalRequests"],
    queryFn: getTechnicalRequests,
  });
};
export const useTechnicalRequestById = (requestId: string) => {
  return useQuery({
    queryKey: ["technicalRequest", requestId],
    queryFn: () => getTechnicalRequestsById(requestId),
  });
};
