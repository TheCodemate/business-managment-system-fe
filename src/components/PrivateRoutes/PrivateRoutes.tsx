import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/services/queries";
import { Loading } from "../Loading/Loading";

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
