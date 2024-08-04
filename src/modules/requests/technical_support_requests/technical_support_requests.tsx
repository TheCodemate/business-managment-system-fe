import { Table, TableCaption } from "@/components/ui/table";

import { useTechnicalRequests } from "../use_technical_requests";
import { CustomTableHeader } from "./custom_table_header";
import { CustomTableBody } from "./custom_table_body/custom_table_body";

const headerTitles = [
  "Id",
  "Od",
  "Czas",
  "Status",
  "Przydzielone do",
  "Działania",
];

export const TechnicalSupportRequests = () => {
  const { data: requests, isPending } = useTechnicalRequests();

  return (
    <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
      <TableCaption>A list of your all requests.</TableCaption>
      <CustomTableHeader headersList={headerTitles} />
      <CustomTableBody requests={requests} isLoading={isPending} />
    </Table>
  );
};
