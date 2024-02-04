import { useMutation } from "@tanstack/react-query";
import { CartItemType, CustomerType } from "../types";
import {
  addCustomer,
  addToCart,
  loginUser,
  logoutUser,
  registerUser,
  requestUserPasswordReset,
  resetUserPassword,
} from "./controllers";
import { queryClient } from "../context/QueryProvider";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { delay } from "../utils/delay";

export const useLogin = () => {
  const navigate = useNavigate();
  const { authHandler } = useAuth();
  return useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      loginUser(values),
    onSuccess: (data) => {
      authHandler(data);
      navigate("/");
    },
    onError: (error) => error.message,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { authHandler } = useAuth();

  useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      authHandler(data);
      navigate("/login");
    },
    onError: (error) => error.message,
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      registerUser(values),
    onSuccess: () => {
      delay(5000, () => navigate("/login"));
    },
    onError: (error) => error.message,
  });
};

export const useRequestUserPasswordReset = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (email: string) => requestUserPasswordReset(email),
    onSuccess: () => {
      delay(5000, () => navigate("/login"));
    },
    onError: (error) => {
      delay(5000, () => navigate("/login"));
      return error.message;
    },
  });
};

export const usePasswordReset = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: { password: string; resetToken: string }) =>
      resetUserPassword(values),
    onSuccess: () => {
      delay(5000, () => navigate("/login"));
    },
    onError: (error) => error.message,
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (cartItem: CartItemType) => addToCart(cartItem),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
      return data;
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export const useAddCustomer = () => {
  return useMutation({
    mutationFn: (data: CustomerType) => addCustomer(data),
    onError: (error) => error.message,
  });
};
