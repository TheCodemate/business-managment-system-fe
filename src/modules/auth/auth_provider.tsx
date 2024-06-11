import { ReactElement, createContext, useContext, useState } from "react";

type Props = {
  children: ReactElement | ReactElement[];
};

export type AuthType = {
  isAuth: boolean;
  user: {
    id: number | null;
    email: string;
  } | null;
};

type AuthContextType = {
  auth: AuthType;
  authHandler: (data: AuthType) => void;
};

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "You are using this hook outside a context provider. Please use within the context."
    );
  }

  return context;
};

export const AuthProvider = ({ children }: Props) => {
  const [auth, setIsAuth] = useState<AuthType>({
    isAuth: false,
    user: {
      id: null,
      email: "",
    },
  });

  const authHandler = (data: AuthType) => {
    setIsAuth({
      isAuth: data.isAuth,
      user: data.user,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, authHandler }}>
      {children}
    </AuthContext.Provider>
  );
};
