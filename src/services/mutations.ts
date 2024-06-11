import { useMutation } from "@tanstack/react-query";
import {
  CartItemType,
  CustomerType,
  RequestRequestType,
  TechnicalResponseRequestType,
  UploadedFile,
  UploadedProductRequestType,
} from "../types";
import {
  addCustomer,
  addToCart,
  loginUser,
  logoutUser,
  registerUser,
  requestUserPasswordReset,
  resetUserPassword,
  removeFromCart,
  deleteCartItem,
  postNewRequest,
  assignUser,
  unassignUser,
  postResponse,
  uploadProducts,
  searchProducts,
  uploadFile,
  removeUploadedFile,
} from "./controllers";
import { useNavigate } from "react-router-dom";
import { delay } from "../utils/delay";
import { OnSuccessHandler } from "@/components/FileUploader/types";
import { queryClient } from "@/modules/global_provider/query_provider";
import { authenticationHandler } from "@/modules/auth/use_auth";

export const useAuth = () => {
  return useMutation({
    mutationFn: authenticationHandler,
    onError: (error) => error.message,
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const { mutate: authHandler } = useAuth();

  useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: (data) => {
      authHandler(data);
      navigate("/");
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
    onError: (error) => {
      return error.message;
    },
  });
};

export const useRemoveFromCart = () => {
  return useMutation({
    mutationFn: (cartItem: CartItemType) => removeFromCart(cartItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
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

export const useDeleteCartItem = () => {
  return useMutation({
    mutationFn: (cartItemId: string) => deleteCartItem(cartItemId),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cartItems"] });
    },
  });
};

export const usePostNewRequest = () => {
  return useMutation({
    mutationFn: (request: RequestRequestType) => postNewRequest(request),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicalRequests"] });
    },
  });
};
export const useProductUpload = () => {
  return useMutation({
    mutationFn: (products: UploadedProductRequestType[]) =>
      uploadProducts(products),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useAssignment = () => {
  return useMutation({
    mutationFn: ({
      userId,
      requestId,
    }: {
      userId: string;
      requestId: string;
    }) => assignUser(userId, requestId),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicalRequests"] });
    },
  });
};
export const useUnassign = () => {
  return useMutation({
    mutationFn: ({
      userId,
      requestId,
    }: {
      userId: string;
      requestId: string;
    }) => unassignUser(userId, requestId),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicalRequests"] });
    },
  });
};

export const usePostResponse = () => {
  return useMutation({
    mutationFn: (response: TechnicalResponseRequestType) =>
      postResponse(response),
    onError: (error) => error.message,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["technicalRequests"] });
    },
  });
};

export const useGetSearchedProducts = () => {
  return useMutation({
    mutationFn: (searchPhrase: string) => searchProducts(searchPhrase),
    onError: (error) => error.message,
  });
};

export const useUploadFile = ({
  onSuccess,
  insertFile,
}: {
  insertFile: (file: UploadedFile) => void;
  onSuccess: OnSuccessHandler;
}) => {
  return useMutation({
    mutationFn: (file: FormData) => uploadFile(file),
    onError: (error) => error.message,
    onSuccess: (data) => {
      insertFile(data);
      onSuccess(data);
    },
  });
};

export const useRemoveFile = ({ onSuccess }: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: async (fileId: string) => removeUploadedFile(fileId),
    onError: (error) => error.message,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};
