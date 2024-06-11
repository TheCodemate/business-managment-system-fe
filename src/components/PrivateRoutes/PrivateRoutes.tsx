import { Outlet, Navigate } from "react-router-dom";
import { Loading } from "../Loading/Loading";
import { useAuth } from "@/modules/auth/use_auth";

export const PrivateRoutes = () => {
  const { data, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading color={"#141414"} />
      </div>
    );
  }

  return data?.isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
