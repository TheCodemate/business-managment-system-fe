import { Outlet, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../context/AuthProvider";
import { Loading } from "../Loading/Loading";
import { axiosUser } from "../../api/axios";

const authenticationHandler = async () => {
  try {
    const { data } = await axiosUser({
      withCredentials: true,
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not fetch data. The reason is unknown. Try again later."
    );
  }
};

export const PrivateRoutes = () => {
  const { auth, authHandler } = useAuth();
  const { isLoading } = useQuery({
    queryKey: ["authenticate"],
    queryFn: async () => {
      const data = await authenticationHandler();

      authHandler(data);
      return data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading color={"#141414"} />
      </div>
    );
  }

  return auth && auth.isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
