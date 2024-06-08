import { Loading } from "@/components/Loading/Loading";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { Table, TableCaption } from "@/components/ui/table";
import { Modal } from "@/components/Modal/Modal";

import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";
import { useDisclosure } from "../hooks/useDisclosure";
import { useTechnicalRequests } from "@/services/queries";
import { RequestsTableHeader } from "./requests_table_header";
import { RequestsTableBody } from "./requests_table_body/requests_table_body";

const tableHeaders = ["Id", "Od", "Czas", "Status", "Przydziel do", ""];

export const Requests = () => {
  const { data: requests, isPending } = useTechnicalRequests();
  const {
    isOpen: isAddRequestFormOpen,
    closeHandler: closeAddRequestForm,
    openHandler: openAddRequestForm,
  } = useDisclosure();

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Tutaj znajduje się strefa pomocy. Składając zapytanie mozesz uzyskać potrzebne informacje dotyczące produktów. Kliknij przycisk 'Nowe zapytanie' aby dodać"
        title="Twoje zapytania"
        onClick={openAddRequestForm}
        buttonContent="Nowe zapytanie"
        buttonVisible={true}
      />

      <main className="flex flex-col justify-stretch w-full h-full overflow-hidden scroll-y-auto">
        {isPending ? (
          <Loading color="#141414" />
        ) : (
          <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
            <TableCaption>Lista wszystkich utworzonych zapytań</TableCaption>
            <RequestsTableHeader headersList={tableHeaders} />
            <RequestsTableBody requests={requests} />
          </Table>
        )}
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeAddRequestForm}>
        <AddRequestForm closeHandler={closeAddRequestForm} />
      </Modal>
    </div>
  );
};
