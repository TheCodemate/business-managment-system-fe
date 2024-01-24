import { ReactElement, createContext, useContext } from "react";
import { Customer } from "../../../../types";

const CustomerTableContext = createContext<Customer[] | null>(null);

export const useTable = () => {
  const context = useContext(CustomerTableContext);

  if (!context) {
    throw new Error(
      "You try to use this component outside of the context. Please insert component inside context"
    );
  }

  return context;
};

type Props<T> = {
  children: ReactElement | ReactElement[];
  tableData: T[];
};

export const CustomerTableContextProvider = ({
  children,
  tableData,
}: Props<Customer>) => {
  return (
    <CustomerTableContext.Provider value={tableData}>
      {children}
    </CustomerTableContext.Provider>
  );
};
