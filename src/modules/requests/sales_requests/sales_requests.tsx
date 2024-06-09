import { Loading } from "@/components/Loading/Loading";
import { Table, TableCaption } from "@/components/ui/table";

import { useTechnicalRequests } from "../use_technical_requests";
import { CustomTableHeader } from "./custom_table_header";
import { CustomTableBody } from "./custom_table_body/custom_table_body";

const tableHeaders = ["Id", "Od", "Czas", "Status", "Przydziel do", ""];

export const SalesRequests = () => {
  const { data: requests, isPending } = useTechnicalRequests();

  return (
    <>
      {isPending ? (
        <Loading color="#141414" />
      ) : (
        <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
          <TableCaption>Lista wszystkich utworzonych zapytań</TableCaption>
          <CustomTableHeader headersList={tableHeaders} />
          <CustomTableBody requests={requests} />
        </Table>
      )}
    </>
  );
};
