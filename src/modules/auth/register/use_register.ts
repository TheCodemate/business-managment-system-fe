import { axiosUser } from "@/api/axios";
import { delay } from "@/utils/delay";
import { throwError } from "@/utils/throwError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
    throwError({
      error,
      message: "User could not be registered. Try again later",
    });
  }
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
