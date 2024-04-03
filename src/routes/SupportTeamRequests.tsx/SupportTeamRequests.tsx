import { Avatar } from "@/components/Avatar/Avatar";
import { Button } from "@/components/Buttons/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Modal } from "@/components/Modal/Modal";
import { useState } from "react";
import { AddRequestForm } from "@/components/AddRequestForm/AddRequestForm";
import { AssignmentAvatar } from "@/components/Avatar/AssignmentAvatar";
import { requests } from "@/data";

import { ResponseRequestType } from "@/types";
import { TechnicalRequestResponseForm } from "@/components/Forms/TechnicalRequestResponseForm/TechnicalRequestResponseForm";

export const SupportTeamRequests = () => {
  const [isAddRequestFormOpen, setIsAddRequestFormOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [request, setRequest] = useState<ResponseRequestType>();

  const openModal = () => {
    setIsAddRequestFormOpen(true);
  };
  const closeModal = () => {
    setIsAddRequestFormOpen(false);
  };

  const closePreviewRequestModal = () => {
    setIsPreviewModalOpen(false);
  };

  const openPreviewRequestModal = (requestDetail: ResponseRequestType) => {
    setRequest(requestDetail);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      <PageHeader
        icon="addRequest"
        content="Lista wszystkich zapytań zgłoszonych przez zespół sprzedazowy."
        title="Panel zapytań"
        onClick={openModal}
        buttonContent="Nowe zapytanie"
      />

      <main className="flex flex-col justify-stretch w-full h-full">
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
            {requests.map((request) => {
              return (
                <TableRow className="bg-bgPrimary rounded-lg">
                  <TableCell className="font-medium">
                    {request.requestId}
                  </TableCell>
                  <TableCell>
                    {request.requestedBy ? (
                      <>
                        <p className="font-bold">{`${request.requestedBy.firstName} ${request.requestedBy.lastName}`}</p>
                        <p className="">{`Departament: ${request.requestedBy.department}`}</p>
                        <p className="">{`Sklep: ${request.requestedBy.store}`}</p>
                      </>
                    ) : (
                      <p>Data not provided</p>
                    )}
                  </TableCell>
                  <TableCell>
                    <Timer createdAt={request.createdAt} timeCap={120} />
                  </TableCell>
                  <TableCell>
                    {request.highPriority ? "Wysoki" : "Normalny"}
                  </TableCell>
                  <TableCell>
                    <StatusIndicator status={request.status} />
                  </TableCell>
                  <TableCell className="flex justify-center items-stretch">
                    {request.assignedTo.length > 0 ? (
                      request.assignedTo.map((assignee) => {
                        return (
                          <Avatar
                            assignedTo={`${assignee.firstName} ${assignee.lastName}`}
                          />
                        );
                      })
                    ) : (
                      <AssignmentAvatar />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openPreviewRequestModal(request)}
                      content="Rozwiąż"
                      variant=""
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </main>
      <Modal isOpen={isAddRequestFormOpen} toggleModal={closeModal}>
        <AddRequestForm closeHandler={closeModal} />
      </Modal>

      <Modal isOpen={isPreviewModalOpen} toggleModal={closePreviewRequestModal}>
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
          <TechnicalRequestResponseForm
            request={request}
            onCloseHandler={closePreviewRequestModal}
          />
        </div>
      </Modal>
    </div>
  );
};
