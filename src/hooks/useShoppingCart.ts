import { useMutation } from "@tanstack/react-query";
import { axiosShoppingCart } from "../api/axios";
import { AxiosError } from "axios";
import { z } from "zod";
import { queryClient } from "../context/QueryProvider";

const cartItemSchema = z.object({
  product_id: z.string(),
  quantity: z.number(),
});

type CartItemType = z.infer<typeof cartItemSchema>;

const modifyShoppingCart = async (cartItem: CartItemType) => {
  try {
    const { data } = await axiosShoppingCart.post(
      `/`,
      {
        cartItem: cartItem,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("error: ", error.message);
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      console.log("error: ", error.message);
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};

export const useShoppingCart = () => {
  const modifyShoppingCartMutation = useMutation({
    mutationFn: (cartItem: CartItemType) => modifyShoppingCart(cartItem),
    onSuccess: (data) => {
      queryClient.setQueryData(["shoppingCart"], data);
      queryClient.invalidateQueries({ queryKey: ["shoppingCart"] });
      return data;
    },
    onError: (error) => {
      return error.message;
    },
  });

  const modifyShoppingCartHandler = (cartItem: CartItemType) => {
    modifyShoppingCartMutation.mutate(cartItem);
  };
  return {
    modifyShoppingCartMutation: {
      modifyShoppingCartHandler,
      data: modifyShoppingCartMutation.data,
      confirmationMessage: modifyShoppingCartMutation.data?.message,
      error: modifyShoppingCartMutation.error?.message,
      isPending: modifyShoppingCartMutation.isPending,
    },
  };
};
