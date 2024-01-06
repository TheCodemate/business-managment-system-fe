import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { AuthType, useAuth } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";

const authenticationHandler = async () => {
  try {
    const res = await fetch("http://localhost:8081/api/members", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText: Error = await res.json();
      throw new Error(errorText.message);
    }

    const member: AuthType = await res.json();

    return member;
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
  const navigate = useNavigate();
  const { isLoading } = useQuery({
    queryKey: ["authenticate"],
    queryFn: async () => await authenticationHandler(),
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CircularProgress sx={{ color: "#6225AF" }} />
      </div>
    );
  }

  return auth.isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};
