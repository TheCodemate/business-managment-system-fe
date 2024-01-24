import { ReactElement } from "react";
import { useTable } from "../context";
import { Customer } from "../../../../../types";

type TableBodyProps<T> = {
  children: (tableData: T[]) => ReactElement[];
};

export const TableBody = ({ children }: TableBodyProps<Customer>) => {
  const customers = useTable();

  return <tbody>{children(customers)}</tbody>;
};
