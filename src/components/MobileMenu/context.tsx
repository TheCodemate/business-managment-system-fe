import { ReactElement, createContext, useContext, useState } from "react";

type MobileMenuType =
  | {
      isExpanded: boolean;
      expandHandler: () => void;
    }
  | undefined;

export const MobileMenuContext = createContext<MobileMenuType>(undefined);

export const useMobileMenuContext = () => {
  const context = useContext(MobileMenuContext);

  if (!context) {
    throw new Error("It seems your are using component out of the context");
  }

  return context;
};

export const MobileMenuContextProvider = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const expandHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <MobileMenuContext.Provider value={{ isExpanded, expandHandler }}>
      {children}
    </MobileMenuContext.Provider>
  );
};
