import { useQuery } from "@tanstack/react-query";
import {
  authenticationHandler,
  fetchUsers,
  getTechnicalRequests,
  getTechnicalRequestsById,
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
export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["authenticate"],
    queryFn: authenticationHandler,
  });
};

export const useUploadedProducts = () => {
  return useQuery({
    queryKey: ["uploadedProducts"],
    queryFn: getUploadedProducts,
  });
};
