import { useMutation } from "@tanstack/react-query";
import { AuthType, useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const loginHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await fetch("http://localhost:8081/api/members/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!response.ok) {
      const errorText: Error = await response.json();
      throw new Error(errorText.message);
    }

    const data = await response.json();
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

const logoutHandler = async () => {
  try {
    const response = await fetch(
      "http://localhost:8081/api/members/logoutMember"
    );
    if (!response.ok) {
      const errorText: Error = await response.json();
      throw new Error(
        `Error ${response.status} occurred. Could not logout - ${errorText}`
      );
    }
    const member: AuthType = await response.json();
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

export const useMember = () => {
  const { authHandler } = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => logoutHandler(),
    onSuccess: () => {
      authHandler({ isAuth: false, user: null });
      navigate("/login");
    },
    onError: (error) => error.message,
  });

  const loginMutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      loginHandler(values),
    onSuccess: (data) => {
      authHandler(data);
      navigate("/");
    },
    onError: (error) => {
      return error.message;
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const login = (credentials: { email: string; password: string }) => {
    loginMutation.mutate(credentials);
  };

  return {
    loginMutation: {
      login,
      data: loginMutation.data,
      error: loginMutation.error,
      isPending: loginMutation.isPending,
    },
    logoutMutation: {
      logout,
      data: logoutMutation.data,
      error: logoutMutation.error,
    },
  };
};
