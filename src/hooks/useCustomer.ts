import { MutationOptions, useMutation } from "@tanstack/react-query";
import { CustomerType } from "../types";
import { AxiosError } from "axios";
import { axiosCustomer } from "../api/axios";

const addCustomerHandler = async (customer: CustomerType) => {
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

export const useCustomer = () => {
  const addCustomerMutation = useMutation({
    mutationFn: (data: CustomerType) => addCustomerHandler(data),
    onError: (error) => error.message,
  });

  const addCustomer = (
    customer: CustomerType,
    options?: MutationOptions<CustomerType, Error, unknown>
  ) => addCustomerMutation.mutate(customer, options);

  return {
    addCustomerMutation: {
      addCustomer,
      data: addCustomerMutation.data,
      confirmationMessage: addCustomerMutation.data?.message,
      error: addCustomerMutation.error?.message,
      isPending: addCustomerMutation.isPending,
      isError: addCustomerMutation.isError,
      isSuccess: addCustomerMutation.isSuccess,
    },
  };
};
