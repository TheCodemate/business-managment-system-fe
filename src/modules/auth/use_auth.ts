import { axiosUser } from "@/api/axios";
import { throwError } from "@/utils/throwError";
import { useQuery } from "@tanstack/react-query";

export const authenticationHandler = async () => {
  try {
    const { data } = await axiosUser.get<{
      isAuth: boolean;
      user: {
        id: number | null;
        email: string;
      } | null;
    }>("/authenticateMember", {
      withCredentials: true,
    });

    return data;
  } catch (error) {
    throwError({
      error,
      message: "Could not authenticate user. Try again later",
    });
  }
};

export const useAuth = () => {
  return useQuery({
    queryKey: ["authenticate"],
    queryFn: authenticationHandler,
  });
};
