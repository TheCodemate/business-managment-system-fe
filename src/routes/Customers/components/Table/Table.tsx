import { ReactElement } from "react";

import { CustomerTableContextProvider } from "./context";
import { Customer } from "../../../../types";
import { TableHeader } from "./components/TableHeader";
import { TableHead } from "./components/TableHead";
import { TableBody } from "./components/TableBody";
import { TableRow } from "./components/TableRow";

type Props<T> = {
  children: ReactElement | ReactElement[];
  tableData: T[];
};

export const Table = ({ children, tableData }: Props<Customer>) => {
  if (!tableData) {
    return <p>No data included in the table</p>;
  }

  return (
    <CustomerTableContextProvider tableData={tableData}>
      <table className="w-full border-separate border-spacing-x-0 border-spacing-y-4">
        {children}
      </table>
    </CustomerTableContextProvider>
  );
};

Table.Head = TableHead;
Table.Header = TableHeader;
Table.Body = TableBody;
Table.Row = TableRow;
