import { useState } from "react";
import { useTechnicalRequests } from "@/services/queries";
import { Button } from "@/components/Buttons/Button";
import { PageHeader } from "@/components/PageHeader/PageHeader";
import { StatusIndicator } from "@/components/StatusIndicator/StatusIndicator";
import { Timer } from "@/components/Timer/Timer";
import { Loading } from "@/components/Loading/Loading";
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
import { AssigneeAvatar } from "@/components/Avatar/Avatar";
import { AssignmentDisplay } from "@/components/AssignementDisplay/AssignmentDisplay";

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
        content="Tutaj znajduje się strefa pomocy. Składając zapytanie mozesz uzyskać potrzebne informacje dotyczące produktów. Kliknij przycisk 'Nowe zapytanie' aby dodać"
        title="Twoje zapytania"
        onClick={openModal}
        buttonContent="Nowe zapytanie"
        buttonVisible={true}
      />

      <main className="flex flex-col justify-stretch w-full h-full overflow-hidden scroll-y-auto">
        {isPending ? (
          <Loading color="#141414" />
        ) : (
          <Table className="w-[100%] p-10 border-separate border-spacing-y-3 overflow-hidden">
            <TableCaption>Lista wszystkich utworzonych zapytań</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Od</TableHead>
                <TableHead>Czas</TableHead>
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
                      className="bg-bgPrimary rounded-lg h-[120px]"
                    >
                      <TableCell className="min-w-[120px]">
                        {request.technicalRequestId}
                      </TableCell>
                      <TableCell className="min-w-[120px]">
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
                      <TableCell className="min-w-[120px]">
                        <Timer
                          expiredAt={request.expiresAt}
                          createdAt={request.createdAt}
                          resolved={request.resolved}
                          resolvedAt={request.resolvedAt}
                        />
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <StatusIndicator
                          status={
                            request.requestStatus.technicalRequestStatusName
                          }
                        />
                      </TableCell>
                      <TableCell className="min-w-[200px] items-center justify-center grow-1 h-full">
                        <div className="flex justify-center w-full">
                          {request.resolved ? (
                            <AssigneeAvatar
                              requestId={request.technicalRequestId}
                              assignedTo={
                                request.technicalRequestResolvedBy.userAccountId
                              }
                              removable={false}
                              size={"large"}
                            />
                          ) : (
                            <AssignmentDisplay
                              technicalRequestId={request.technicalRequestId}
                              assignees={request.assignees}
                            />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="min-w-[120px]">
                        <Button
                          onClick={() => {
                            openPreviewRequestModal(request.technicalRequestId);
                          }}
                          content="Podgląd"
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
