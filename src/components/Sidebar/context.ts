import { createContext, useContext } from "react";

type SidebarContextType = {
  isExpanded: boolean;
};

export const SidebarContext = createContext<SidebarContextType>({
  isExpanded: false,
});

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("It seems your are using component out of the context");
  }

  return context;
};
