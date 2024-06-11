import { axiosUser } from "@/api/axios";
import { queryClient } from "@/modules/global_provider/query_provider";
import { throwError } from "@/utils/throwError";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

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
    throwError({ error, message: "Could not login. Try again later" });
  }
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      loginUser(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authenticate"] });
      navigate("/");
    },
    onError: (error) => error.message,
  });
};
