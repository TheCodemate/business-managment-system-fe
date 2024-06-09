import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";
import { Modal } from "@/components/Modal/Modal";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { useDisclosure } from "@/modules/hooks/useDisclosure";
import { SalesRequests } from "@/modules/requests/sales_requests/sales_requests";

export const SalesRequestPage = () => {
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
        <SalesRequests />
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeAddRequestForm}>
        <AddRequestForm closeHandler={closeAddRequestForm} />
      </Modal>
    </div>
  );
};
