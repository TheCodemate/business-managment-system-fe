import { AxiosError } from "axios";
import {
  axiosUser,
  axiosShoppingCart,
  axiosCustomer,
  axiosProducts,
  axiosRequests,
} from "../api/axios";
import {
  CartItemResponseType,
  CartItemType,
  CustomerType,
  ProductType,
  RequestRequestType,
  TechnicalRequestResponseType,
} from "../types";

export const addToCart = async (cartItem: CartItemType) => {
  try {
    const { data } = await axiosShoppingCart.post<{ message: string }>(
      `/add-to-cart`,
      {
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};

export const getCartItems = async () => {
  const { data } = await axiosShoppingCart.get<CartItemResponseType[]>("/", {
    withCredentials: true,
  });
  return data;
};

export const loginUser = async (userCredentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosUser.post(`/login`, userCredentials, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not login. The reason is unknown. Try again later.");
  }
};

export const logoutUser = async () => {
  try {
    const { data } = await axiosUser.get("/logoutMember");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Could not logout. The reason is unknown. Try again later."
    );
  }
};

export const registerUser = async (userCredentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosUser.post<{ message: string }>(
      "/",
      userCredentials
    );

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not register user. The reason is unknown. Try again later."
    );
  }
};

export const requestUserPasswordReset = async (email: string) => {
  try {
    const { data } = await axiosUser.post(`/reset-password-request`, {
      email: email,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};

export const resetUserPassword = async ({
  password,
  resetToken,
}: {
  password: string;
  resetToken: string;
}) => {
  try {
    const { data } = await axiosUser.post(`/reset-password`, {
      password,
      resetToken,
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const addCustomer = async (customer: CustomerType) => {
  try {
    const { data } = await axiosCustomer.post("/add-customer", {
      customer: customer,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Something went wrong. Could not add user. Try again later."
    );
  }
};

export const getCustomers = async () => {
  try {
    const { data } = await axiosCustomer.get<CustomerType[]>(
      "http://localhost:8081/api/customers"
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not fetch data. Unknown error occurred. Try again later."
    );
  }
};

export const getProducts = async () => {
  try {
    const { data } = await axiosProducts.get<ProductType[]>("/", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not fetch data. Unknown error occurred. Try again later."
    );
  }
};

export const removeFromCart = async (cartItem: CartItemType) => {
  try {
    const { data } = await axiosShoppingCart.post<{ message: string }>(
      `/remove-from-cart`,
      {
        cartItem: cartItem,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};
export const deleteCartItem = async (cartItemId: string) => {
  try {
    const { data } = await axiosShoppingCart.post<{ message: string }>(
      `/delete-cart-item`,
      {
        cartItemId,
      },
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};
export const postNewRequest = async (request: RequestRequestType) => {
  try {
    const { data } = await axiosRequests.post<{ message: string }>(
      `/`,
      {
        ...request,
      },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};

export const getTechnicalRequests = async () => {
  try {
    const { data } = await axiosRequests.get<TechnicalRequestResponseType[]>(
      `/`,
      { withCredentials: true }
    );

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};
export const getTechnicalRequestsById = async (requestId: string) => {
  try {
    const { data } = await axiosRequests.get<TechnicalRequestResponseType>(
      `/request-by-id`,
      {
        params: { requestId: requestId },
        withCredentials: true,
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not reset password. Try again later.");
  }
};
