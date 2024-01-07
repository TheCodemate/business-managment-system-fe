import { ReactElement, createContext, useContext } from "react";

type ActionsContextType = {} | undefined;

export const ActionsContext = createContext<ActionsContextType>(undefined);

export const useActionsContext = () => {
  const context = useContext(ActionsContext);

  if (!context) {
    throw new Error(
      "Element must be wrapped with Dialog.Actions component. Make sure you have placed it correctly"
    );
  }

  return context;
};

type Props = {
  children: ReactElement | ReactElement[];
};

export const ActionsContextProvider = ({ children }: Props) => {
  return (
    <ActionsContext.Provider value={{}}>{children}</ActionsContext.Provider>
  );
};
