import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { axiosMember } from "../api/axios";

import { useAuth } from "../context/AuthProvider";
import { delay } from "../utils/delay";

const loginHandler = async (userCredentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosMember.post(`/login`, userCredentials);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error("Could not login. The reason is unknown. Try again later.");
  }
};

const logoutHandler = async () => {
  try {
    const { data } = await axiosMember.get("/logoutMember");
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error(
      "Could not logout. The reason is unknown. Try again later."
    );
  }
};

const registerHandler = async (userCredentials: {
  email: string;
  password: string;
}) => {
  try {
    const { data } = await axiosMember.post("", userCredentials);

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    throw new Error(
      "Could not register user. The reason is unknown. Try again later."
    );
  }
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
