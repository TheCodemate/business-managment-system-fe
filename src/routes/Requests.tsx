import { useState } from "react";
import { useTechnicalRequests } from "@/services/queries";
import { Button } from "@/components/Buttons/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import { Loading } from "@/components/Loading/Loading";
import { Avatar } from "@/components/Avatar/Avatar";
import { Modal } from "@/components/Modal/Modal";
import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";
import { RequestPreviewModal } from "@/components/RequestPreviewModal/RequestPreviewModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Requests = () => {
  const [isAddRequestFormOpen, setIsAddRequestFormOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const { data: requests, isPending } = useTechnicalRequests();
  const [requestId, setRequestId] = useState("");

  const openModal = () => {
    setIsAddRequestFormOpen(true);
  };
  const closeModal = () => {
    setIsAddRequestFormOpen(false);
  };

  const closePreviewRequestModal = () => {
    setIsPreviewModalOpen(false);
  };

  const openPreviewRequestModal = (requestId: string) => {
    setRequestId(requestId);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Tutaj znajduje się strefa pomocy. Składając zapytanie mozesz uzyskać potrzebne informacje dotyczące produktów."
        title="Panel zapytań"
        onClick={openModal}
        buttonContent="Nowe zapytanie"
      />

      <main className="flex flex-col justify-stretch w-full h-full">
        {isPending ? (
          <Loading color="#141414" />
        ) : (
          <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
            <TableCaption>A list of your all requests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Od</TableHead>
                <TableHead>Czas</TableHead>
                <TableHead>Priorytet</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="flex justify-center items-center">
                  Przydzielone do
                </TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {requests ? (
                requests.map((request) => {
                  return (
                    <TableRow
                      key={request.technicalRequestId}
                      className="bg-bgPrimary rounded-lg"
                    >
                      <TableCell className="font-medium">
                        {request.technicalRequestId}
                      </TableCell>
                      <TableCell>
                        {request.contactPerson ||
                        request.contactPersonEmail ||
                        request.contactPersonPhone ? (
                          <>
                            <p className="font-bold">{`${request.contactPerson}`}</p>
                            <p className="">{`Email: ${request.contactPersonEmail}`}</p>
                            <p className="">{`Phone: ${request.contactPersonPhone}`}</p>
                          </>
                        ) : (
                          <p className="font-bold">
                            Customer data not provided
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Timer createdAt={request.createdAt} timeCap={120} />
                      </TableCell>
                      <TableCell>"Normalny"</TableCell>
                      <TableCell>
                        <StatusIndicator status={"notAssigned"} />
                      </TableCell>
                      <TableCell className="flex justify-center items-stretch"></TableCell>
                      {request.assignedTo
                        ? request.assignedTo.map((assignee) => {
                            return <Avatar assignedTo={`${assignee.userId}`} />;
                          })
                        : ""}
                      <TableCell>
                        <Button
                          onClick={() => {
                            openPreviewRequestModal(request.technicalRequestId);
                          }}
                          content="Szczegóły"
                        />
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <p>Nie masz zadnych zapytań</p>
              )}
            </TableBody>
          </Table>
        )}
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeModal}>
        <AddRequestForm closeHandler={closeModal} />
      </Modal>

      <Modal isOpen={isPreviewModalOpen} toggleModal={closePreviewRequestModal}>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <RequestPreviewModal
            requestId={requestId}
            timeCount={new Date()}
            onCloseHandler={closePreviewRequestModal}
          />
        </div>
      </Modal>
    </div>
  );
};
