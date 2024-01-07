import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { AuthType, useAuth } from "../context/AuthProvider";
import { delay } from "../utils/delay";

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

const registerHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await fetch("http://localhost:8081/api/members", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error(
      `Something went wrong. You cannot register now. Try again later. Error code: ${res.status}`
    );
  }

  const data = await res.json();

  return data;
};

export const useMember = () => {
  const { authHandler } = useAuth();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (values: { email: string; password: string }) =>
      registerHandler(values),
    onSuccess: () => {
      delay(5000, () => navigate("/login"));
    },
    onError: (error) => error.message,
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutHandler(),
    onSuccess: (data) => {
      authHandler(data);
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
    onError: (error) => error.message,
  });

  const logout = () => {
    logoutMutation.mutate();
  };

  const login = (credentials: { email: string; password: string }) => {
    loginMutation.mutate(credentials);
  };

  const register = (credentials: { email: string; password: string }) => {
    registerMutation.mutate(credentials);
  };

  console.log("useMembers - registerMutatino: ", registerMutation.data);

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
    registerMutation: {
      confirmationMessage: registerMutation.data,
      isPending: registerMutation.isPending,
      error: registerMutation.error,
      register,
    },
  };
};
