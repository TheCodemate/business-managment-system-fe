import { ReactElement } from "react";
import { useTable } from "../context";
import { Customer } from "../../../../../types";

type TableBodyProps<T> = {
  children: (tableData: T[]) => ReactElement[];
};

export const TableBody = ({ children }: TableBodyProps<Customer>) => {
  const customers = useTable();
  if (!children) {
    return <p>There are no customers available in the system at the moment</p>;
  }

  return <tbody>{children(customers)}</tbody>;
};
