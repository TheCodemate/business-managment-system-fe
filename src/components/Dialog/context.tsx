import { ReactElement, createContext, useContext } from "react";
type ContextType = { isAvailable: boolean } | undefined;

const DialogContext = createContext<ContextType>(undefined);

export const useDialogContext = () => {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error(
      "You cannot use this element outside context provider. Please insert the element as Dialog children"
    );
  }

  return context;
};

type Props = {
  children: ReactElement | ReactElement[];
};

export const DialogContextProvider = ({ children }: Props) => {
  return (
    <DialogContext.Provider value={{ isAvailable: true }}>
      {children}
    </DialogContext.Provider>
  );
};
